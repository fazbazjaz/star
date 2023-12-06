import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf((info) => {
      const { timestamp, level, message, value } = info;
      let formattedValue;
      if (!value || typeof value === "undefined") {
        formattedValue = "";
      } else if (typeof value === "string" || typeof value === "number") {
        formattedValue = value;
      } else if (typeof value === "boolean") {
        formattedValue = String(value);
      } else if (Object.keys(value).length) {
        formattedValue = JSON.stringify(value);
      }

      const timestampColor = "\x1b[34m";
      const messageColor = "\x1b[33m";

      const coloredTimestamp = `${timestampColor}${timestamp}\x1b[0m`;
      const coloredMessage = `${messageColor}${message}\x1b[0m`;

      return `${coloredTimestamp} ${level} ${coloredMessage}: ${formattedValue}`;
    })
  )
});
