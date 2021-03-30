const express = require("express");
const twitterController = require("../controllers/twitterController");

const router = express.Router();

router.get("/", twitterController.getHome);
router.get("/tweets/:user_id", twitterController.findUserTweet);
router.post('/addTweets', twitterController.addTweet);

module.exports = router;