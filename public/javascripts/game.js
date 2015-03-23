/**
 * Created by vyt on 2015-03-13.
 */
var _ = require('lodash');


/*wrongAnswer returns true when player has more lives left and false when lives are 0*/
var Game = module.exports = function Game () {
    this.lives = 3;
    this.points = 0;
    this.difficulty = 1; // can be 1 < 10 correct, 2 < 20 correct, 3 < 30 correct, 4 > 30 correct
    this.correctAnswers = 0;
    this.timerInterval = null;
    this.gameState = 'waiting';
    this.gameStartedAt = null

};

Game.prototype.correctAnswer = function correctAnswer (percentLeft) {
    console.log('timeleft: ' +percentLeft);
    if (this.lives <= 0) return false; // just in case
    if (!this.gameStartedAt) this.gameStartedAt = new Date();

    this.points = this.points + 100 * this.difficulty + Number(percentLeft);
    this.correctAnswers += 1;
    if (this.correctAnswers % 5 === 0) this.serverCheck();
    if (this.correctAnswers >= 10 && this.correctAnswers < 20) this.difficulty = 2;
    if (this.correctAnswers >= 20 && this.correctAnswers < 30) this.difficulty = 3;
    if (this.correctAnswers >= 30 && this.correctAnswers < 30) this.difficulty = 4
};

Game.prototype.wrongAnswer = function wrongAnswer () {
    if (this.lives <= 0) return false; // just in case
    if (!this.gameStartedAt) this.gameStartedAt = new Date();

    this.lives -= 1;
    if (this.lives <= 0) return false; // game over
    return true
};

Game.prototype.setTimer = function setTimer (timeMilliSec, react) {
    clearInterval(this.timerInterval);
    var pace = timeMilliSec / 10;
    this.timerInterval = setInterval(function () {
        var currentBarState = react.state.timer;

            if (currentBarState <= 0) {
                if (this.lives >= 1) {
                    this.lives -= 1;
                    if (this.lives > 0) react.setState({timer: 100})
                }
                else {
                    clearInterval(this.timerInterval);
                    // save to DB
                    if (this.gameState != 'over') react.gameOver()
                }
            }
            else {
                if (this.gameState != 'over') react.setState({timer: currentBarState - 10});
            }

    }.bind(this),
    pace);

};

Game.prototype.serverCheck = function serverCheck () {
    //TODO uzhashinti
  console.log('server chaking');
  $.post('/data/confirm', {timeElapsed: (new Date() - this.gameStartedAt), points: this.points, correctAnswers: this.correctAnswers})
    .done(function (data) {
          console.log(data);
          if (data.continue == false) {
              this.lives = 0;
              this.points = 0;
          }
      }.bind(this))
};




