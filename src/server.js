const { request, response } = require("express");
const express = require("express");
const ejs = require("ejs");

const router = require("./routers");
const server = express();

server.engine("ejs", ejs.renderFile);
server.set('views', "./src/views");
server.use(express.static("./src/assets"));

server.use(express.urlencoded({ extended: true }));
server.use(router);

//server.use(express.json());

server.listen(9000, () => {
    console.log("server is running");
});