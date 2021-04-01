const db = require('../db');

exports.getLasts = (callback) => {
    db.query('SELECT t.*,u.*,t.id tweet_id,DATE_FORMAT(t.creation_date, " %W %D %M %Y %H:%I") date FROM twitter.tweets  t LEFT JOIN twitter.users u ON t.user_id=u.id ORDER BY t.id DESC LIMIT 20;', (error, result) => {
        if (error) {
            console.log('error: ', error);
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}

exports.getUserTweet = (user_id, callback) => {
    db.query(`SELECT t.*,u.*,t.id tweet_id,DATE_FORMAT(t.creation_date, " %W %D %M %Y %H:%I") date FROM twitter.tweets t RIGHT JOIN twitter.users u ON t.user_id=u.id WHERE u.id = ${user_id} ORDER BY t.id DESC;`, (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}

exports.insertTweet = (requestBody, user_id, callback) => {
    let query = `Insert into twitter.tweets (user_id, creation_date, message) values (${user_id}, CURDATE(), "${requestBody.message}")`;
    console.log(query);
    db.query(query, (error, result) => {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}

exports.getDetailsTweet = (tweet_id, callback) => {
    db.query(`SELECT t.*,u.*,t.id tweet_id,DATE_FORMAT(t.creation_date, " %W %D %M %Y %H:%I") date FROM twitter.tweets t LEFT JOIN twitter.users u ON t.user_id=u.id WHERE t.id = ${tweet_id} ORDER BY t.id DESC;`, (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}

exports.updateTweet = (requestBody, tweet_id, user_id, callback) => {
    db.query(`UPDATE tweets SET message  = "${requestBody.message}" WHERE id = ${tweet_id};`, (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}

exports.deleteTweet = (requestBody, tweet_id, user_id, callback) => {
    db.query(`DELETE FROM tweets WHERE id = ${tweet_id};`, (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}