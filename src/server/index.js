import path from 'path'
import fs from 'fs'
import https from 'https'
import express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import { requestLogger, errorLogger } from '../services/logger'
import bodyParser  from 'body-parser'
import cors        from 'cors'
import * as Sentry from '@sentry/node'

const app = express()
const PORT = process.env.PORT || 6000
const mediaBucket = process.env.MEDIA_BUCKET || 'quickframe-media-dev'

process.env.PWD = path.join(process.cwd(), 'src', 'server')

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://9685ff9064ec4c7995ba01650d31d0eb@sentry.io/1334775',
        environment: process.env.ENVIRONMENT,
    })
}

if (process.env.NODE_ENV === 'production')
  app.use(Sentry.Handlers.requestHandler())

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST)
app.set('mediaUrl', `https://s3.amazonaws.com/${mediaBucket}`)
app.set('s3bucket', 'quickframe-media-dev')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//app.use("/assets", express.static(__dirname + '/assets'));
app.use(compression())
app.use('/lib', express.static(path.join(__dirname, '..', 'build', 'library')))
app.use('/build', express.static(path.join(__dirname, '..', 'build')))

app.use(favicon(path.join(__dirname, 'assets', 'favicon-16x16.png')))

// REDIRECT to https on aws
// =============================================================================
app.use(function(req, res, next) {
    const protocol = req.get('X-Forwarded-Proto')
    if((!req.secure) && ((typeof protocol != 'undefined') && protocol !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url)
    } else {
        next()
    }
})

app.use(cors())
app.options('*', cors({
    origin: /\.quickframe\.com$/,
    credentials: true
  })
)

app.use(bodyParser({ limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

// ACCESS LOGS
app.use(requestLogger)
app.use(errorLogger)

// ROUTES
// =============================================================================
require('./routes')(app)

if (process.env.NODE_ENV === 'production')
  app.use(Sentry.Handlers.errorHandler())

// SSL SERVER
// =============================================================================
let options = {}
let server
if('development' == process.env.NODE_ENV) {
    options = {
        key: fs.readFileSync(__dirname + '/ssl/server.key'),
        cert: fs.readFileSync(__dirname + '/ssl/server.crt'),
        requestCert: false,
        rejectUnauthorized: false
    }

    server = https.createServer(options, app)

    module.exports = (cb) => server.listen(PORT, cb)
} else {
    module.exports = (cb) => app.listen(PORT, cb)
}


// GRACEFUL
// =============================================================================
// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString())
    shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString())
    shutdown()
})

// shut down server
function shutdown() {
  // server.close(function onServerClosed (err) {
  //   if (err) {
  //     console.error(err)
  //     process.exitCode = 1;
  //   }
    process.exit()
  //})
}
