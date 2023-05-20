import { utilities, WinstonModule } from 'nest-winston';
import winstonDaily = require('winston-daily-rotate-file');
import * as winston from 'winston';

const env = process.env.NODE_ENV;
const logDir = __dirname + '/../../logs';

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30,
    zippedArchive: true,
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'prod' ? 'http' : 'silly',
      format:
        env === 'prod'
          ?
            winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('readme', {
                prettyPrint: true,
              }),
            ),
    }),

    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
