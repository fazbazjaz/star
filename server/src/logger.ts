import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info) => {
      const { timestamp, level, message, value } = info;
      let valueOutput;
      if (!value || typeof value === "undefined") {
        valueOutput = "";
      } else if (typeof value === "string" || typeof value === "number") {
        valueOutput = value;
      } else if (Object.keys(value).length) {
        valueOutput = JSON.stringify(value);
      }
      return `| ${timestamp} | ${level} | ${message}: ${valueOutput} |`;
    })
  )
});
