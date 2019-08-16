import axios from 'axios'
import querystring from 'querystring'
import { ajax, buildQApiUrl, buildApiUrl } from 'Utils/api'

const { 
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_REDIRECT_URI,
  INSTAGRAM_RESPONSE_TYPE,

  GOOGLE_CLIENT_ID,
  GOOGLE_API_KEY,

  GOOGLE_SCOPE,
  GOOGLE_DISCOVERY_DOCS,

  FACEBOOK_APP_ID,
} = process.env

export default class oAuthHelper {
  constructor ({ platform, brandUuid, bearerToken }) {
    if(!platform) {
      throw new Error(`A platform must be declared`)
    }

    if(!brandUuid) {
      throw new Error(`brandUuid must be declared`)
    }

    if(!bearerToken) {
      throw new Error(`bearerToken must be declared`)
    }

    this.libraries = {
      facebook: 'https://connect.facebook.net/en_US/sdk.js',
      youtube: 'https://apis.google.com/js/api.js',
    }
  
    this.platform = platform
    this.brandUuid = brandUuid
    this.bearerToken = bearerToken
  }

  fetchLibrary() {
    return new Promise((resolve, reject) => {
      const libraryUrl = this.libraries[this.platform]

      if(!this.libraries[this.platform]) {
        return resolve({})
      }
    
      const libraryScript = document.createElement("script")

      libraryScript.onerror = (error) => {
        return reject(new Error(error))
      }
  
      libraryScript.onload = (params) => {
        return resolve(params)
      }
  
      document.head.appendChild(libraryScript)
      libraryScript.src = libraryUrl
    })
  }

  sendAuthData(data = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: buildApiUrl(`/oauth/passthru`),
        data: {
          platform: this.platform,
          data: {
            ...data
          }
        },
      })
      .then(function (response) {
        if(!response.data || !response.data.success) {
          throw new Error('passthru failure, see azazzle logs')
        }

        return resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)

        return reject(error)
      });
    })
  }

  sendOauthValidated() {
    return new Promise((resolve, reject) => {
      const { brandUuid, platform } = this

      ajax({
        method: 'PATCH',
        url: buildQApiUrl(`/brands/${brandUuid}`),
        token: this.bearerToken,
        params: {
          [`oauth_${platform}`]: true,
          has_onboarded: true,
        },
      })
      .then(function (response) {
        if(!response.data || !response.data.brand || response.data.brand.uuid !== brandUuid) {
          throw new Error('brand patch failure, see qapi logs')
        }

        return resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)

        return reject(error)
      });
    })
  }

  getAuthToken() {
    switch(this.platform) {
      case 'twitter':
        // https://developer.twitter.com/en/docs/basics/authentication/overview/3-legged-oauth
        return new Promise((resolve, reject) => {
          axios({
            method: 'POST',
            url: buildApiUrl(`/oauth/twitter`),
            data: {},
          })
          .then(function (response) {
            if(!response || !response.data) {
              throw new Error('unable to obtain Twitter OAuth URL')
            }

            const { oauth_token } = querystring.parse(response.data)

            if(!oauth_token) {
              throw new Error('unable to derive oauth_token from azazzle response')
            }

            const oauthToken = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`

            return resolve(oauthToken);
          })
          .catch(function (error) {
            return reject(error);
          });
        })
      break;

      case 'facebook':
        // https://developers.facebook.com/docs/javascript
        return new Promise((resolve, reject) => {
          try {
            FB.init({
              appId: FACEBOOK_APP_ID,
              cookie: false,
              xfbml: true,
              version: 'v4.0'
            })

            FB.login((response) => {
              if (response.authResponse) {
                return resolve(response.authResponse)
              } else {
                throw new Error('User cancelled login or did not fully authorize.')
              }

            }, {
              scope: 'ads_read,manage_pages,pages_show_list,read_insights'
            })

          } catch (error) {
            console.log(error)
            return reject(error)
          }
        })

      case 'instagram':
        // https://www.instagram.com/developer/authentication/
        window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&response_type=${INSTAGRAM_RESPONSE_TYPE}`
      break;

      case 'youtube':
        // https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps
        return new Promise((resolve, reject) => {
          gapi.load('client:auth2', () => {
            gapi.client.init({
              'apiKey': GOOGLE_API_KEY,
              'discoveryDocs': JSON.parse(GOOGLE_DISCOVERY_DOCS),
              'clientId': GOOGLE_CLIENT_ID,
              'scope': GOOGLE_SCOPE
            })
            .then(() => {
              const GoogleAuth = gapi.auth2.getAuthInstance()

              return {
                GoogleAuth,
              }
            })
            .then((params = {}) => {
              const { GoogleAuth } = params
              const authToken = GoogleAuth.grantOfflineAccess()

              return {
                ...params,
                authToken,
              }
            })
            .then((params = {}) => {
              const { authToken } = params

              return resolve(authToken)
            })
            .catch((err) => {
              console.log(err)

              return reject(err)
            })
          })
        })
    }
  }
}
