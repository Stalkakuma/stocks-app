const express = require("express");
const path = require("path");
const logger = require("./logger");
const cors = require("cors");
const client = require("./db");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserRoute = require("./UserRouter");

const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
const app = express();

app.use(express.static(path.resolve(__dirname, "../st-ui/build")));

mongoose.connect(client.uri, { useNewUrlParser: true }).then(
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
