import axios from 'axios'
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

  TWITTER_OAUTH_NONCE,
  TWITTER_OAUTH_CALLBACK,
  TWITTER_OAUTH_SIGNATURE_METHOD,
  TWITTER_OAUTH_TIMESTAMP,
  TWITTER_OAUTH_CONSUMER_KEY,
  TWITTER_OAUTH_SIGNATURE,
  TWITTER_OAUTH_VERSION,
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
          [`oauth_${platform}`]: true
        },
      })
      .then(function (response) {
        if(!response.data || !response.data.brand || response.data.brand !== brandUuid) {
          throw new Error('passthru failure, see qapi logs')
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
