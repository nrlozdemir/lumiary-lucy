import axios from 'axios'
import { buildQApiUrl, buildApiUrl } from 'Utils/api'

const { 
  INSTAGRAM_CLIENT_ID = 'INSTAGRAM_CLIENT_ID',
  INSTAGRAM_REDIRECT_URI = 'INSTAGRAM_REDIRECT_URI',
  INSTAGRAM_RESPONSE_TYPE = 'INSTAGRAM_RESPONSE_TYPE',

  GOOGLE_CLIENT_ID = '410840184484-9ljsun49l3ue4l99sl41u2k4lipleb2o.apps.googleusercontent.com',
  GOOGLE_API_KEY = 'AIzaSyCG2hOoLzZfV-163zq73nxuZpwWuoxobkE',
  GOOGLE_SCOPE = 'https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/adwords',
  GOOGLE_DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtubeAnalytics/v1/rest'
  ],

  FACEBOOK_APP_ID = 'FACEBOOK_APP_ID',

  TWITTER_OAUTH_NONCE = 'K7ny27JTpKVsTgdyLdDfmQQWVLERj2zAK5BslRsqyw',
  TWITTER_OAUTH_CALLBACK = 'http%3A%2F%2Fmyapp.com%3A3005%2Ftwitter%2Fprocess_callback',
  TWITTER_OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1',
  TWITTER_OAUTH_TIMESTAMP = '1300228849',
  TWITTER_OAUTH_CONSUMER_KEY = 'OqEqJeafRSF11jBMStrZz',
  TWITTER_OAUTH_SIGNATURE = 'Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D',
  TWITTER_OAUTH_VERSION = '1.0',
} = process.env

export default class oAuthHelper {
  constructor ({ platform, brandUuid }) {
    if(!platform) {
      throw new Error(`A platform must be declared`)
    }

    this.libraries = {
      facebook: 'https://connect.facebook.net/en_US/sdk.js',
      youtube: 'https://apis.google.com/js/api.js',
    }
  
    this.platform = platform
    this.brandUuid = brandUuid
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
      console.log(this.platform)
      console.log(this.brandUuid)
      console.log(buildQApiUrl(`/brand/oauth`))
      return resolve(true)

      // patch qAPI
      // update the brand store instead of the OAuth store

      // axios({
      //   method: 'PATCH',
      //   url: buildQApiUrl(`/brand/${brandUuid}`),
      //   data: {
      //     [`oauth_${platform}`]: true
      //   },
      // })

      // .then(function (response) {
      //   if(!response.data || !response.data.success) {
      //     throw new Error('passthru failure, see azazzle logs')
      //   }

      //   return resolve(response.data)
      // })
      // .catch(function (error) {
      //   console.log(error)

      //   return reject(error)
      // });
    })
  }

  getAuthToken() {
    switch(this.platform) {
      case 'twitter':
        // https://developer.twitter.com/en/docs/basics/authentication/overview/3-legged-oauth
        axios({
          method: 'POST',
          url: buildApiUrl(`/oauth/twitter`),
          data: {
            oauth_nonce: TWITTER_OAUTH_NONCE,
            oauth_callback: TWITTER_OAUTH_CALLBACK,
            oauth_signature_method: TWITTER_OAUTH_SIGNATURE_METHOD,
            oauth_timestamp: TWITTER_OAUTH_TIMESTAMP,
            oauth_consumer_key: TWITTER_OAUTH_CONSUMER_KEY,
            oauth_signature: TWITTER_OAUTH_SIGNATURE,
            oauth_version: TWITTER_OAUTH_VERSION,
          },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      break;

      case 'facebook':
        // https://developers.facebook.com/docs/javascript
        FB.init({
          appId: FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v4.0'
        })

        FB.getLoginStatus(function(response) {
          console.log(response)
        })
      break;

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
              'discoveryDocs': GOOGLE_DISCOVERY_DOCS,
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
