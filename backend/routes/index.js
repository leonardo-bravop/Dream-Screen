const express = require("express");
const User = require("../models/User");

const router = express();

router.get("/users", (req, res) => {
  User.findAll().then((users) => {
    res.send(users);
  });
});

router.post("/register", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) {
      User.create(req.body).then((user) => {
        res.status(201).send(user);
      });
    } else {
      res.status(406).send("User already exists.");
    }
  });
});


module.exports = router;
