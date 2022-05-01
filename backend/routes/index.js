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

//Add and delete favorites
router.put("/favorites", (req, res) => {
  const { userId, mediaType, mediaId } = req.query;
  User.findByPk(userId).then((user) => {
    let favoriteMedia;
    mediaType === "movie"
      ? (favoriteMedia = "favoriteMovies")
      : (favoriteMedia = "favoriteTv");
    let favoriteValues = user[favoriteMedia];
    if (!favoriteValues.split(" ").includes(mediaId)) {
      favoriteValues = `${mediaId} ` + favoriteValues;
      User.update(
        { [favoriteMedia]: favoriteValues },
        { where: { email: user.email }, returning: true }
      ).then((updatedUser) => {
        res.send(updatedUser);
      });
    }
  });
});

router.delete("/favorites", (req, res) => {
  const { userId, MediaId, mediaType } = req.query;
  let favoriteMedia;
  mediaType === "movie"
    ? (favoriteMedia = "favoriteMovies")
    : (favoriteMedia = "favoriteTv");
  User.findByPk(userId).then((user) => {
    let favoriteValues = user[favoriteMedia]
      .split(" ")
      .filter((id) => id != MediaId);
    let valores = favoriteValues.join(" ");
    User.update(
      { [favoriteMedia]: valores },
      { where: { email: user.email }, returning: true }
    ).then((updatedUser) => {
      res.send(updatedUser);
    });
  });
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

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(`id es`, req.params);
  User.findByPk(id,{
    attributes: ["id", "nickName", "favoriteMovies", "favoriteTv"]
  }).then((user) => {
    console.log(`user es`, user);
    if(user.id) res.send(user);
    else res.sendStatus(204)
  });
});



module.exports = router;
