const express = require("express");

const {getById, getByState} = require("../controllers/MediaController")

const router = express.Router()

router.get("/:media/id/:id/language/:language", getById)

router.get("/:mediaType/:state/:language/:page", getByState)


module.exports = router;