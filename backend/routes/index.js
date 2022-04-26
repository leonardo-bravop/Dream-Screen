const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const { Op } = require("sequelize");

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

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.get("/me", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.send(req.user);
});

//Search users by nickname
router.get("/users/search/:searchValue", (req, res) => {
  const { searchValue } = req.params;
  console.log(`params es`, req.params);
  User.findAll({
    attributes: ["id", "nickName", "favoriteMovies", "favoriteTv"],
    where: { nickName: { [Op.like]: `%${searchValue}%` } },
  }).then((users) => {
    if(users.length) res.send(users);
    else res.sendStatus(204)
  });
});

module.exports = router;
