const jwt = require("jsonwebtoken");

const SECRET = "pouetpouet";

const isAuthUpdate = (request, response, next) => {
    console.log('REQUEST' + request.cookies);
    const token = request.cookies.authcookie;
    jwt.verify(token, SECRET, (error, user) => {
        if (error) {
            // response.send(error);
            request.flash('warning', "You must be login.");
            //return;
            next();
        } else {
            console.log("ici isAuth");
            console.log(user);

            const { name, username, exp } = user;

            // Useless or not ?!
            if (Date.now() / 1000 >= exp) {
                response.clearCookie("authcookie");
                // response.send("Session expired. Try to reconnect you.");
                request.flash('warning', "Session expired. Try to reconnect you.");
            }

            const { tweet_id, user_id } = request.params;

            if (user_id == user.user_id) {






                request.user = { name, user_id, username };




                next();

            } else {
                //response.send("You don't have permission.")
                request.flash('warning', "You don't have permission.");
                next();
            }
        }
    });

}

module.exports = isAuthUpdate;