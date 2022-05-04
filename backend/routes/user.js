const express = require("express");

const router = express.Router();

const passport = require("passport");
const {
  getAll,
  register,
  login,
  logOut,
  persistUser,
  addFavoriteMedia,
  deleteFavoriteMedia,
  searchUsersByNickName,
  searchOneUserByNickname,
} = require("../controllers/userController");

router.post("/register", register);

router.post("/login", passport.authenticate("local"), login);

router.post("/logout", logOut);

router.get("/me", persistUser);

router.get("/getAll", getAll);


//Add and delete favorite media

router.put("/favorites", addFavoriteMedia);

router.delete("/favorites", deleteFavoriteMedia);


//Search users

router.get("/searchUsers/:searchValue", searchUsersByNickName);
 
router.get("/searchOne/:nickName", searchOneUserByNickname);

module.exports = router;
