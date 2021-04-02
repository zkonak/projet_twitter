const { response } = require("express");
const twitter = require("../models/twitter");

//consulter la liste des listes de tâches
exports.getHome = (request, response) => {
    twitter.getLasts(async(error, tweetList) => {
        if (error) {
            response.send(error.message);
        }
        const alerts_warning = await request.consumeFlash('warning');

        //create html page
        response.render("index.ejs", { tweetList, alerts_warning });
    });

}

exports.findUserTweet = async(request, response) => {
    const { user_id } = request.params;
    const alerts_warning = await request.consumeFlash('warning');
    console.log(user_id);
    twitter.getUserTweet(user_id, (error, UserTweet) => {
        if (error) {
            response.send(error.message);
        }
        response.render("profile.ejs", { UserTweet, alerts_warning });
    });

}

exports.addTweet = async(request, response) => {
    // On va ajouter user_id avec le cookie?
    const alerts_warning = await request.consumeFlash('warning');

    if (alerts_warning.length == 0) {
        twitter.insertTweet(request.body, request.user.user_id, (error, result) => {
            if (error) {
                response.send(error.message);
            }

            response.redirect("/");


        });
    } else {

        twitter.getLasts((error, tweetList) => {
            if (error) {
                response.send(error.message);
            }

            //create html page
            response.render("index.ejs", { tweetList, alerts_warning });
        });

    }
}

exports.showTweet = (request, response) => {
    const { tweet_id } = request.params;
    console.log(tweet_id);
    twitter.getDetailsTweet(tweet_id, (error, DetailsTweet) => {
        if (error) {
            response.send(error.message);
        }
        tweet = DetailsTweet[0];
        response.render("details.ejs", { tweet });
    });

}

exports.updateTweet = async(request, response) => {
    const { tweet_id, user_id } = request.params;
    const alerts_warning = await request.consumeFlash('warning');
    if (alerts_warning.length == 0) {

        twitter.updateTweet(request.body, tweet_id, user_id, (error, tasks) => {
            if (error) {
                response.send(error.message);
            }

            console.log(user_id);
            twitter.getUserTweet(user_id, (error, UserTweet) => {
                if (error) {
                    response.send(error.message);
                }
                response.render("profile.ejs", { UserTweet, alerts_warning });
            });

        });
    } else {

        twitter.getUserTweet(user_id, (error, UserTweet) => {
            if (error) {
                response.send(error.message);
            }
            response.render("profile.ejs", { UserTweet, alerts_warning });
        });

    }
}

exports.deleteTweet = async(request, response) => {
    const { tweet_id, user_id } = request.params;
    const alerts_warning = await request.consumeFlash('warning');
    if (alerts_warning.length == 0) {
        twitter.deleteTweet(request.body, tweet_id, user_id, (error, tasks) => {
            if (error) {
                response.send(error.message);
            }

            console.log(user_id);
            twitter.getUserTweet(user_id, (error, UserTweet) => {
                if (error) {
                    response.send(error.message);
                }
                console.log(UserTweet);
                response.render("profile.ejs", { UserTweet, alerts_warning });
            });

        });
    } else {

        twitter.getUserTweet(user_id, (error, UserTweet) => {
            if (error) {
                response.send(error.message);
            }
            console.log(UserTweet);
            response.render("profile.ejs", { UserTweet, alerts_warning });
        });

    }
}


exports.myTweets = async(request, response) => {
    const alerts_warning = await request.consumeFlash('warning');
    if (alerts_warning.length == 0) {
        twitter.getUserTweet(request.user.user_id, (error, UserTweet) => {
            if (error) {
                response.send(error.message);
            }
            response.render("profile.ejs", { UserTweet, alerts_warning });
        });
    } else {

        twitter.getLasts((error, tweetList) => {
            if (error) {
                response.send(error.message);
            }
            // const alerts_warning = await request.consumeFlash('warning');
            //console.log(alerts_warning);
            //create html page
            response.render("index.ejs", { tweetList, alerts_warning });
        });


    }

}