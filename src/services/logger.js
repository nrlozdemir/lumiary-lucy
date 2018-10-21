import winston from 'winston'
const expressWinston = require('express-winston')

exports.requestLogger = expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true
    })
  ],
  meta: true,
  msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}} {{ req.connection.remoteAddress }}",
  expressFormat: true,
  colorize: true,
  ignoreRoute: (req, res) => {
    return req.url.match(/^\/healthcheck/)
  }
})

exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true
    })
  ],
  level: 'error'
})


