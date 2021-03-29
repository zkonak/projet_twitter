const { response } = require("express");
const twitter = require("../models/twitter");

//consulter la liste des listes de tâches
exports.getHome = (request, response) => {

    // todolist.getAll((error, todolist) => {
    //     if (error) {
    //         response.send(error.message);
    //     }
    // }
    //create html page
    response.render("index.ejs");




}