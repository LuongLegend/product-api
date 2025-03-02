import winston from "winston";
import "dotenv/config";

const logLevel = {
  error: 0,
  warning: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const fileLogFormat = winston.format.combine(
  winston.format.timestamp({
    format: "HH:MM:ss DD/MM/YYYY",
  }),
  winston.format.align(),
  winston.format.printf(
    ({
      level,
      message,
      timestamp,
      logMetadata,
      statusCode = 500,
      path,
      method,
    }) => {
      if (level === "http") return `${timestamp} [${level}] ${message}`;
      return `${timestamp} [${level}][${statusCode}] [${method}]${path} | ${message} ${
        logMetadata || ""
      }`;
    }
  )
);

const logger = winston.createLogger({
  levels: logLevel,
  level: process.env.LOG_LEVEL || "info",
  format: fileLogFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "http" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
