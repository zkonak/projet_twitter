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

exports.login = async(request, response) => {
    const alerts_warning = await request.consumeFlash('warning');
    console.log(alerts_warning);
    response.render("login.ejs", { alerts_warning });

}

exports.authenticate = async(request, response) => {

    if (!request.body.username || !request.body.password) {
        await request.flash('warning', 'Please fill the required field!');
        response.redirect("/login");
    } else {
        user.getByUsername(request.body, async(error, result) => {
            if (error) {
                response.send(error.message);
            } else if (result.length == 0) {

                await request.flash('warning', "This user doesn't exist!");
                // const error = await request.consumeFlash('error');
                // console.log(alerts_error);
                response.redirect("/login");

            } else {

                encryptedPassword = result[0].password;
                bcrypt.compare(request.body.password, encryptedPassword, async(error, correct) => {
                    if (error) {
                        response.send(error.message);
                    }


                    if (!correct) {
                        await request.flash('warning', "Invalid password");
                        // const incorrect = await request.consumeFlash('incorrect');
                        response.redirect("/login");

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
}

exports.logout = (request, response) => {
    response.clearCookie("authcookie");
    response.redirect("/");
}