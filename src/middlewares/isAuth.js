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

            const { name, username, exp } = user;

            // Useless or not ?!
            if (Date.now() / 1000 >= exp) {
                response.clearCookie("authcookie");
                response.send("Session expired. Try to reconnect you.");
            }


            request.user = { name, username };




            next();

        }


    });

}

module.exports = isAuth;