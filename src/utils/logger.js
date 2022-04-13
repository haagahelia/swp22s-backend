import winston from "winston";

const logConfiguration = {
    'transports': [
        new winston.transports.Console({
            level: "silly"
        }),
        new winston.transports.File({
            filename: './logs/winstonBackendLog.log',
            level: "silly"
        }),
    ]
};

export const logger = winston.createLogger(logConfiguration); 