const express = require("express");
const twitterController = require("../controllers/twitterController");

const router = express.Router();
router.get("/", twitterController.getHome);
module.exports = router;