const { request, response } = require("express");
const express = require("express");
const ejs = require("ejs");
const server = express();
const router = require("./routers");
server.engine("ejs", ejs.renderFile);
server.set('views', "./src/views");
server.use(express.urlencoded({ extended: true }));
server.use(router);
server.use(express.static("./src/assets"));

//server.use(express.json());

server.listen("8080", () => {
    console.log("server is running");
});