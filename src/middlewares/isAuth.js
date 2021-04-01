const jwt = require("jsonwebtoken");

const SECRET = "pouetpouet";
const isAuth = (request, response, next) => {
    console.log('REQUEST' + request.cookies);
    const token = request.cookies.authcookie;
    jwt.verify(token, SECRET, (error, user) => {
        if (error) {
            response.send(error);
            return;
        } else {
            console.log("ici isAuth");
            console.log(user);

            const { name, user_id, username, exp } = user;

            // Useless or not ?!
            if (Date.now() / 1000 >= exp) {
                response.clearCookie("authcookie");
                response.send("Session expired. Try to reconnect you.");
            }


            request.user = { name, user_id, username };




            next();

        }


    });

}

module.exports = isAuth;
