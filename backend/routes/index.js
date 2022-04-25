const express = require("express");
const { Passport } = require("passport/lib");
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

router.post("/api/login", Passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.post("/api/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.get("/api/me", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.send(req.user);
});

module.exports = router;
