import winston from 'winston'
import expressWinston from 'express-winston'
import { Loggly } from 'winston-loggly-bulk'

if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  winston.add(Loggly, {
    token: '94a79949-6203-49a7-a56c-4bb437f3f885',
    subdomain: 'quickframe',
    json: true,
    tags: [`lucy-${process.env.ENVIRONMENT}`],
  })
}

let transports = {
  requestLogger: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
    }),
  ],
  errorLogger: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
    }),
  ],
}

exports.logger = winston

if (process.env.NODE_ENV !== 'development') {
  transports.requestLogger.push(
    new Loggly({
      token: '94a79949-6203-49a7-a56c-4bb437f3f885',
      subdomain: 'quickframe',
      json: true,
      tags: [`lucy-${process.env.ENVIRONMENT}`],
    })
  )
  transports.errorLogger.push(
    new Loggly({
      token: '94a79949-6203-49a7-a56c-4bb437f3f885',
      subdomain: 'quickframe',
      json: true,
      tags: [`lucy-${process.env.ENVIRONMENT}`],
    })
  )
}

exports.requestLogger = expressWinston.logger({
  transports: transports.requestLogger,
  meta: true,
  msg:
    'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}} {{ req.connection.remoteAddress }}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: (req, res) => {
    return req.url.match(/^\/healthcheck/)
  },
})

exports.errorLogger = expressWinston.errorLogger({
  transports: transports.errorLogger,
  level: 'error',
})
