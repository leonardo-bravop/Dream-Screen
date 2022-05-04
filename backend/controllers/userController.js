const User = require("../models/User");
const { Op } = require("sequelize");

exports.getAll = (req, res) => {
  User.findAll().then((users) => {
    res.send(users);
  });
};

exports.register = (req, res, next) => {
  if (!req.body.password) {
    res.status(400);
    next(new Error("Please enter a [3-8] characters password"));
    return;
  }
  if (!req.body.nickName) {
    res.status(400);
    next(new Error("Please enter a [2-20] characters nickname"));
    return;
  }
  if (!req.body.email) {
    res.status(400);
    next(new Error("Please enter a valid email"));
    return;
  }
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return User.create(req.body);
      } else {
        return {};
      }
    })
    .then((newUser) => {
      if (newUser.dataValues) res.status(201).send(newUser);
      else {
        res.status(406);
        return next(
          new Error("There's already a user registered with this e-mail")
        );
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.login = (req, res) => {
  res.send(req.user);
};

exports.logOut = (req, res) => {
  req.logOut();
  res.sendStatus(200);
};

exports.persistUser = (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.send(req.user);
};

//Add and delete favorite media

exports.addFavoriteMedia = (req, res) => {
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
      )
        .then((updatedUser) => {
          res.send(updatedUser);
        })
        .catch((error) => {
          next(error);
        });
    }
  });
};

exports.deleteFavoriteMedia = (req, res) => {
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
    )
      .then((updatedUser) => {
        res.send(updatedUser);
      })
      .catch((error) => {
        next(error);
      });
  });
};

//Search users

exports.searchUsersByNickName = (req, res) => {
  const { searchValue } = req.params;
  if (!searchValue) {
    res.status(400);
    next(new Error("Please enter a search value"));
    return;
  }
  User.findAll({
    attributes: ["id", "nickName", "favoriteMovies", "favoriteTv"],
    where: { nickName: { [Op.like]: `%${searchValue}%` } },
  })
    .then((users) => {
      if (users.length) res.send(users);
      else res.sendStatus(204);
    })
    .catch((error) => {
      next(error);
    });
};

exports.searchOneUserByNickname = (req, res) => {
  const { nickName } = req.params;
  if (!nickName) {
    res.status(400);
    next(new Error("Please enter a nickname"));
    return;
  }  User.findOne(
    { where: { nickName: nickName } },
    {
      attributes: ["id", "nickName", "favoriteMovies", "favoriteTv"],
    }
  )
    .then((user) => {
      if (user.id) res.send(user);
      else res.sendStatus(204);
    })
    .catch((error) => {
      next(error);
    });
};
