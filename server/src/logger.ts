import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf((info) => {
      const { timestamp, level, message, value } = info;
      let formattedValue;
      if (
        typeof value === "undefined" ||
        typeof value === "boolean" ||
        typeof value === "string" ||
        typeof value === "number"
      ) {
        formattedValue = String(value);
      } else if (Object.keys(value).length) {
        formattedValue = JSON.stringify(value);
      } else if (!value) {
        formattedValue = "";
      }

      const timestampColor = "\x1b[34m";
      const messageColor = "\x1b[33m";

      const coloredTimestamp = `${timestampColor}${timestamp}\x1b[0m`;
      const coloredMessage = `${messageColor}${message}\x1b[0m`;

      return `${coloredTimestamp} ${level} ${coloredMessage}: ${formattedValue}`;
    })
  )
});
