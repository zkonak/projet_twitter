const db = require('../db');

exports.getLasts = (callback) => {
    db.query('SELECT t.*,u.* FROM twitter.tweets  t LEFT JOIN twitter.users u ON t.user_id=u.id ORDER BY t.id DESC LIMIT 20;', (error, result) => {
        if (error) {
            console.log('error: ', error);
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}

exports.getUserTweet = (user_id, callback) => {
    db.query(`SELECT t.*,u.* FROM twitter.tweets t LEFT JOIN twitter.users u ON t.user_id=u.id WHERE t.user_id = ${user_id} ORDER BY t.id DESC;`, (error, result) =>{
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}