const express = require("express");
const logger = require("./logger");
const cors = require("cors");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: "http://localhost:3000",
};
const UserRoute = require("./UserRouter");
const config = require("./db");
const app = express();

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

logger.info("text info", { meta: 1 });
logger.warn("text warning");
logger.error(new Error("something went wrong!"));
logger.debug("debug text");

app.use("/user", UserRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
