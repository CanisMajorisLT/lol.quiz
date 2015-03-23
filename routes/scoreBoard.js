/**
 * Created by vyt on 2015-03-15.
 */
var redis = require('redis').createClient();
var Promise = require('promise');

var addHighScore = function addHighscore (score, name) {
    redis.zadd('lolquiz:highscore', score, name)

};

var getHighscore = function getHighscore (start, end) {
    // reik kad nereplacintu nicknamu
    return new Promise(function (resolve, reject) {
        redis.zrange('lolquiz:highscore', start, end, "WITHSCORES", function (err, res) {
        if (err) reject(err);
        else resolve(res)
        })
    });
};


module.exports = {addHighScore: addHighScore, getHighscore:getHighscore};