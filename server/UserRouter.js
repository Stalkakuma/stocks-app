const express = require("express");
const UserRouter = express.Router();

const User = require("./userActions");

const data = [];

UserRouter.route("/create").post((req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      data.push(user);
      res.json("User added successfully");
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err.toString());
    });
});

module.exports = UserRouter;
