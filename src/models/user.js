const db = require('../db');
exports.insertUser = (requestBody, encryptedPassword, callback) => {
    let query = `Insert into twitter.users(username, password, name, last_name, email, telephone, city,birthday)
    values("${requestBody.username}", "${encryptedPassword}", "${requestBody.name}", "${requestBody.last_name}", "${requestBody.email}", "${requestBody.telephone}", "${requestBody.city}","${requestBody.birthday}");
   `;
    console.log(query);
    db.query(query, (error, result) => {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}


exports.getByUsername = (requestBody, callback) => {
    db.query(`select * from twitter.users where username="${requestBody.username}"`, (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}