const express = require("express");

const {
  getById,
  getByState,
  searchMediaByValue,
  getTrending,
} = require("../controllers/mediaController");

const router = express.Router();

router.get("/:media/id/:id/language/:language", getById);

router.get("/:mediaType/:state/:language/:page", getByState);

router.get(
  "/:mediaType/search/:searchValue/:language/:page",
  searchMediaByValue
);

router.get("/getTrending/:language/:page", getTrending);

module.exports = router;