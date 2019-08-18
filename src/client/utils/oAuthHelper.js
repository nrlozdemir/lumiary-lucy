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
    const { brandUuid, platform } = this

    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: buildApiUrl(`/oauth/passthru`),
        data: {
          platform,
          brandUuid,
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

  requestAccessToken({
    code
  }) {
    return new Promise((resolve, reject) => {
      if(!code) {
        return reject(new Error('code is required to get the instagram oauth token'))
      }

      const bodyFormData = new FormData();
      bodyFormData.set('client_id', '25d5d010688646299e9990578044d055');
      bodyFormData.set('client_secret', 'd9164aa10b2a48baa99a2d260821d444');
      bodyFormData.set('grant_type', 'authorization_code');
      bodyFormData.set('redirect_uri', 'https://lumiary-local.quickframe.com:9000/account/oauth');
      bodyFormData.set('code', code);

      axios({
        method: 'POST',
        url: `https://api.instagram.com/oauth/access_token`,
        data: bodyFormData,
        headers: {
          'content-type': 'multipart/form-data'
        },
      })
      .then((response) => {
        if(!response || !response.data) {
          throw new Error('response data not provided')
        }

        return resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        return reject(error)
      })

    })
  }

  verifyToken({ 
    oauth_token,
    oauth_verifier
  }) {
    return new Promise((resolve, reject) => {
      if(!oauth_token || !oauth_verifier) {
        return reject(new Error('oauth_token and oauth_verifier are required to verify the twitter oauth token'))
      }

      axios({
        method: 'POST',
        url: buildApiUrl(`/oauth/twitter_callback`),
        data: {
          oauth_token,
          oauth_verifier
        },
      })
      .then((response) => {
        if(!response || !response.data) {
          throw new Error('response data not provided')
        }

        return resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        return reject(error)
      })

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

            window.location = oauthToken
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
        return new Promise((resolve, reject) => {
          try {
            window.location = `https://api.instagram.com/oauth/authorize/?client_id=25d5d010688646299e9990578044d055&redirect_uri=${encodeURIComponent(`https://lumiary-local.quickframe.com:9000/account/oauth`)}&response_type=code`            
          } catch (error) {
            return reject(error)
          }
        })
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
