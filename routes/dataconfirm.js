/**
 * Created by vyt on 2015-03-14.
 */
var express = require('express');
var router = express.Router();
var redisWrap = require('./scoreBoard');

var calculatePoints = function calculatePoints (numberOfAnswers) {
    var points = 0;
    if (numberOfAnswers > 30) return 6000 + (numberOfAnswers - 30) * 400;
    if (numberOfAnswers > 20 && numberOfAnswers <= 30) return 1000 + 2000 + (numberOfAnswers - 20) * 300;
    if (numberOfAnswers > 10 && numberOfAnswers <= 20) return 1000 + (numberOfAnswers - 10) * 200;
    return 100 * numberOfAnswers
};


/* GET home page. */
router.post('/confirm', function(req, res, next) {

  var data = req.body;
  var minimumAnswers = data.timeElapsed / 3000;
  var points = calculatePoints(data.correctAnswers);
  console.log(minimumAnswers, points);
  console.log(data);
  res.send('confirmed!!!!')
});

router.post('/save', function (req, res, next) {
    var score = req.body.score;
    var name = req.body.name;
    var hash = '';
    console.log('savong scpre for' + name + ' ' + score);
    redisWrap.addHighScore(score, name);
    res.send({});
});

router.get('/scores', function (req, res, next) {
    console.log('getting scores');
    redisWrap.getHighscore(-15, -1)
                .then(function (result) {
                    console.log('sending scores', result);
                    res.send(result)
                })
                .catch(function (err) {
            console.log('error ar get score', err);
                })


})



module.exports = router;