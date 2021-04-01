const express = require("express");
const twitterController = require("../controllers/twitterController");
const userController = require("../controllers/userController");
const isAuth = require("../middlewares/isAuth");
const isAuthUpdate = require("../middlewares/isAuthUpdate");
const router = express.Router();

router.get("/", twitterController.getHome);
router.get("/tweets/:user_id", twitterController.findUserTweet);
router.post('/addTweet', isAuth, twitterController.addTweet);
router.get('/showTweet/:tweet_id', twitterController.showTweet);
router.post('/updateTweet/:tweet_id/:user_id', isAuthUpdate, twitterController.updateTweet);
router.get('/deleteTweet/:tweet_id/:user_id', isAuthUpdate, twitterController.deleteTweet);
router.get('/myTweets', isAuth, twitterController.myTweets);



router.get('/signup', userController.signup);
router.post('/signup', userController.inscription);
router.get('/login', userController.login);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout);

module.exports = router;