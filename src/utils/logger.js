import { createLogger, transports, format } from "winston";

const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }),
  format.splat(),
  format.printf((info) => {
    return `${info.timestamp} [${info.level.toLocaleUpperCase()}] ${
      info.message
    }`;
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.File({
      filename: "./logs/winstonBackendLog.log",
      level: "silly",
    }),
    new transports.Console({ level: "silly" }),
  ],
});

export default logger;
