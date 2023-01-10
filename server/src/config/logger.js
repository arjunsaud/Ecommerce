import pino from "pino"
const transport = pino.transport({
  target: "./transport.js",
  options: { destination: "error.log" },
});

const logger = pino(transport);

export default logger
