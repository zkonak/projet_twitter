const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("../models/user");
const { request } = require("http");

exports.signup = (request, response) => {

    response.render("signup.ejs");
}


exports.inscription = (request, response) => {


    user.getByUsername(request.body, (error, result) => {
        if (error) {
            response.send(error.message);
        } else if (result.length > 0) {

            response.send("This user already exists!");

        } else {

            const saltRounds = 10;
            bcrypt.hash(request.body.password, saltRounds, (error, encryptedPassword) => {

                if (error) {
                    response.send(error.message);
                }

                user.insertUser(request.body, encryptedPassword, (error, result) => {
                    if (error) {
                        response.send(error.message);
                    }

                    response.redirect("/login");


                });





            });



        }


    });



}

exports.login = (request, response) => {


    response.render("login.ejs");

}


exports.authenticate = (request, response) => {

    user.getByUsername(request.body, (error, result) => {
        if (error) {
            response.send(error.message);
        } else if (result.length == 0) {

            response.send("This user doesn't exist!");

        } else {

            encryptedPassword = result[0].password;
            bcrypt.compare(request.body.password, encryptedPassword, (error, correct) => {
                if (error) {
                    response.send(error.message);
                }


                if (!correct) {
                    response.send("Invalid password!");
                } else {
                    const SECRET = "pouetpouet";
                    const MAXAGE = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour of expiration
                    const user = {
                        name: result[0].name,
                        user_id: result[0].id,
                        username: request.body.username, //result[0].username
                        exp: MAXAGE
                    };





                    jwt.sign(user, SECRET, (error, token) => {
                        if (error) {
                            response.send(error.message);
                        }

                        request.user = {
                            name: result[0].name,
                            username: result[0].username,
                        };

                        response.cookie('authcookie', token, { maxAge: MAXAGE });
                        response.redirect('/');
                    });
                    // response.redirect("/");
                }

            });





        }





    });
}

exports.logout = (request, response) => {
    response.clearCookie("authcookie");
    response.redirect("/");
}