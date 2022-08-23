const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserActions = new Schema(
  {
    nameOfCompany: String,
    priceHistory: [
      {
        open: Number,
        close: Number,
        high: Number,
        low: Number,
        x: String,
        volume: Number,
      },
    ],
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("UserActions", UserActions);
