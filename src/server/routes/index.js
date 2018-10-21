import matchRoute from '../utils/match'
const cache = require('express-redis-cache')({
  host: process.env.REDIS_HOST
})

module.exports = (app) => {

  // HEALTH
  // =============================================================================
  app.use('/healthcheck', require('express-healthcheck')({
    healthy: function () {
      return { status: 'upppp' }
    }
  }))

    //S3 Uploads
  app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: `${app.settings.s3bucket}/uploads`,
    region: 'us-east-1',                            // optional
    headers: {'Access-Control-Allow-Origin': '*'},  // optional
    ACL: 'private',                                 // this is the default - set to `public-read` to let anyone view uploads
  }));


  //SSR
  app.get('/*',
    cache.route({
      prefix: 'blackstar'
    }),
    (req, res) => {
      matchRoute(req, res)
  })

}

