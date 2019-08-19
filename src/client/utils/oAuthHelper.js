import axios from 'axios'
import querystring from 'querystring'
import { ajax, buildQApiUrl, buildApiUrl } from 'Utils/api'

const { 
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,
  INSTAGRAM_REDIRECT_URI,
  INSTAGRAM_RESPONSE_TYPE,
  INSTAGRAM_GRANT_TYPE,

  GOOGLE_CLIENT_ID,
  GOOGLE_API_KEY,
  GOOGLE_SCOPE,
  GOOGLE_DISCOVERY_DOCS,

  FACEBOOK_APP_ID,
  FACEBOOK_SCOPES,
} = process.env

const testEnv = (envString, envValue) => {
  if(!envValue) {
    throw new Error(`The env variable ${envString} is not set`)
  }

  return true
}

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
    console.log(process.env)

    return new Promise((resolve, reject) => {
      if(!code) {
        return reject(new Error('code is required to get the instagram oauth token'))
      }

      const WINDOW_LOCATION_ORIGIN = window.location.origin
      testEnv('WINDOW_LOCATION_ORIGIN', WINDOW_LOCATION_ORIGIN)
      testEnv('INSTAGRAM_CLIENT_ID', INSTAGRAM_CLIENT_ID)
      testEnv('INSTAGRAM_CLIENT_SECRET', INSTAGRAM_CLIENT_SECRET)
      testEnv('INSTAGRAM_GRANT_TYPE', INSTAGRAM_GRANT_TYPE)
      testEnv('INSTAGRAM_REDIRECT_URI', INSTAGRAM_REDIRECT_URI)

      const bodyFormData = new FormData();
      bodyFormData.set('client_id', INSTAGRAM_CLIENT_ID);
      bodyFormData.set('client_secret', INSTAGRAM_CLIENT_SECRET);
      bodyFormData.set('grant_type', INSTAGRAM_GRANT_TYPE);
      bodyFormData.set('redirect_uri', `${WINDOW_LOCATION_ORIGIN}${INSTAGRAM_REDIRECT_URI}`);
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
    console.log(process.env)
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
            testEnv('FACEBOOK_APP_ID', FACEBOOK_APP_ID)
            testEnv('FACEBOOK_SCOPES', FACEBOOK_SCOPES)

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
              scope: FACEBOOK_SCOPES
            })

          } catch (error) {
            console.log(error)
            return reject(error)
          }
        })

      case 'instagram':
        // https://www.instagram.com/developer/authentication/
        return new Promise((resolve, reject) => {
          const WINDOW_LOCATION_ORIGIN = window.location.origin
          testEnv('WINDOW_LOCATION_ORIGIN', WINDOW_LOCATION_ORIGIN)
          testEnv('INSTAGRAM_CLIENT_ID', INSTAGRAM_CLIENT_ID)
          testEnv('INSTAGRAM_REDIRECT_URI', INSTAGRAM_REDIRECT_URI)
          testEnv('INSTAGRAM_RESPONSE_TYPE', INSTAGRAM_RESPONSE_TYPE)

          try {
            window.location = `https://api.instagram.com/oauth/authorize/?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${WINDOW_LOCATION_ORIGIN}${INSTAGRAM_REDIRECT_URI}`)}&response_type=${INSTAGRAM_RESPONSE_TYPE}`            
          } catch (error) {
            return reject(error)
          }
        })
      break;

      case 'youtube':
        // https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps
        return new Promise((resolve, reject) => {
          testEnv('GOOGLE_API_KEY', GOOGLE_API_KEY)
          testEnv('GOOGLE_DISCOVERY_DOCS', GOOGLE_DISCOVERY_DOCS)
          testEnv('GOOGLE_CLIENT_ID', GOOGLE_CLIENT_ID)
          testEnv('GOOGLE_SCOPE', GOOGLE_SCOPE)

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
