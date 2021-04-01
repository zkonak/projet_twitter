const { request, response } = require("express");
const express = require("express");
const ejs = require("ejs");
const session = require('express-session');
const { flash } = require('express-flash-message');


const cookieParser = require('cookie-parser');
const router = require("./routers");
const server = express();

server.engine("ejs", ejs.renderFile);
server.set('views', "./src/views");
server.use(express.static("./src/assets"));
//server.use(sass({ src: "./src/assets",dest: "./src/assets"}));

server.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {secure :false},
    })
);

server.use(flash({ sessionKeyName: 'flashMessage' }));



server.use(express.urlencoded({ extended: true }));
//pour request.cookies
server.use(cookieParser());
server.use(router);



//server.use(express.json());

server.listen(9000, () => {
    console.log("server is running");
});