const mysql = require('mysql2');

//connection à la db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: "twitter"
});

// je me connecte et rentre dansla callback
db.connect((error) => {
    if (error) throw error;
    console.log('Connection to database works!');
});

module.exports = db;