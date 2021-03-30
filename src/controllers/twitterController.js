const { response } = require("express");
const twitter = require("../models/twitter");

//consulter la liste des listes de tâches
exports.getHome = (request, response) => {
    twitter.getLasts((error, tweetList) => {
    if (error) {
            response.send(error.message);
        }
    //create html page
    response.render("index.ejs", {tweetList});
});

}

exports.findUserTweet = (request, response) => {
    const { user_id } = request.params;
     console.log(user_id);
    twitter.getUserTweet(user_id, (error, UserTweet) => {
        if (error) {
            response.send(error.message);
        }
        response.render("profile.ejs", { UserTweet });
    });

}

