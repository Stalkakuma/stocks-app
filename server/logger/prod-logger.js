const { createLogger, format, transports } = require("winston");
const { combine, timestamp, errors, json } = format;

function buildProdLogger() {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
}
module.exports = buildProdLogger;
