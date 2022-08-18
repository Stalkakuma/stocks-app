const express = require("express");
const logger = require("./logger");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

logger.info("text info", { meta: 1 });
logger.warn("text warning");
logger.error(new Error("something went wrong!"));
logger.debug("debug text");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
