const express = require("express");
const twitterController = require("../controllers/twitterController");

const router = express.Router();

router.get("/", twitterController.getHome);
router.get("/tweets/:user_id", twitterController.findUserTweet);
router.post('/addTweet', twitterController.addTweet);
router.get('/showTweet/:tweet_id', twitterController.showTweet);

module.exports = router;