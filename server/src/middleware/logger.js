import pino from 'pino';
import pinoHttp from 'pino-http';
import { LOGGER_CONFIG } from '../constants/constants';

// Create a transport for pino-pretty
const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        levelFirst: true,
        messageFormat: true,
        crlf: false,
        errorProps: '*',
        colorizeObjects: true,
        singleLine: true
      }
    },
    {
      target: 'pino-pretty',
      options: {
        destination: './logs/logs.log',
        mkdir: true
      }
    }
  ]
});

const logger = pino(
  {
    level: LOGGER_CONFIG.level
  },
  transport
);

const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    if (err || res.statusCode >= 500) {
      return 'error';
    } else if (res.statusCode >= 400) {
      return 'warn';
    } else {
      return 'info';
    }
  },
  serializers: {
    req: (req) => ({
      // method: req.method,
      url: req.url
      // headers: { 'user-agent': req.headers['user-agent'] }
    }),
    res: (res) => ({
      statusCode: res.statusCode
      // statusMessage: res.statusMessage
    }),
    err: (err) => ({
      type: err.type,
      message: err.message,
      stack: err.stack
    })
  }
});

export { httpLogger };
