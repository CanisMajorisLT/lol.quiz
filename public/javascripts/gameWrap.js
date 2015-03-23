/**
 * Created by vyt on 2015-03-12.
 */
var React = require('react');
var QuestionPanel = require('./questionPanel');
var ChampionBoard = require('./championBoard');
var gameO = require('./game');
var questionsO = require('./questions');
var TimerBar = require('./timer');
var InfoBoard = require('./infoBoard');
var SavePanel = require('./saveGame');
var NewGamePanel = require('./newGame');
var ScoreBoard = require('./highscoreBoard');
var staticData = require('./staticChampions');
require('../stylesheets/css/game.css');

var GameWrap = React.createClass({displayName: "GameWrap",
    componentDidMount: function () {
        staticData.imageNames.forEach(function (imgName) {
            new Image().src = "/images/champion-icons/" + imgName
        });
    // cia galiam ideti irgi koki nors loading overlay
    },
    getInitialState: function () {
        return {game: new gameO(), questions: new questionsO(), overlayNext: 'none', overlaySave: 'none'}
    },
    newPanel: function () {
      this.setState({overlaySave: 'block'})
    },
    nextGamePanel: function () {
      this.setState({overlaySave: 'none', overlayNext: 'block'})
    },
    newGame: function () {
        console.log('startign new game');
        this.setState({game: new gameO(), questions: new questionsO(), overlayNext: 'none'})
    },
    render: function () {
        console.log('renderign game wrap, overlay', this.state.overlay);
        var styleNext = {display: this.state.overlayNext};
        var styleSave = {display: this.state.overlaySave};
        var newGame = this.state.overlayNext == 'none' && this.state.overlaySave == 'none';
        var game = newGame ? React.createElement(Game, {newGame: newGame, game: this.state.game, questions: this.state.questions, gameOver: this.newPanel}) : null

        return (
            React.createElement("div", null, 
                React.createElement(SavePanel, {next: this.nextGamePanel, style: styleSave, data: this.state.game}), 
                React.createElement(NewGamePanel, {styleNext: styleNext, newGame: this.newGame}), 
                game
            )
        )
    }
});

var Game = React.createClass({displayName: "Game",
    getInitialState: function () {
        // game state could be: waiting (b4 game), progress, over
        return {gameState: "waiting", question: '', champions: [], correctAnswer: '', timer: 100}
    },
    componentDidMount: function () {
        this.setQuestion()
    },
    setQuestion: function () {
        // when calling for new game use next props TODO cia siaip reiketu dauga refraktorint ir sauguma pazeti
        if (this.props.game.gameState == 'over') return;
        if (this.props.game.lives === 0) this.gameOver();

        var question = this.props.questions.nextQuestion(this.props.game.difficulty);
        console.log(question);
        this.props.game.gameState = 'progress';
        this.setState({gameState: 'progress', question: question.question,
                       champions: question.champions, correctAnswer: question.correctAnswer,
                       timer: 100})
    },
    gameController: function (answer) {
        // FIXME kartais 0 tasku lieka ir ne gg
        if (this.props.game.gameState == 'over') return;
        var percentLeft = this.state.timer;
        //assert answer in champions
        var continueGame = true;
        if (answer === this.state.correctAnswer) this.props.game.correctAnswer(percentLeft);
        else {
            // reset timer on wrong answer
            if (this.props.game.lives > 1) this.setState({timer: 100});
            continueGame = this.props.game.wrongAnswer();
        }
        if (continueGame) {
            this.setQuestion();
            console.log('score:' + this.props.game.points);
            console.log('difficulty:' + this.props.game.difficulty);
            console.log('lives:' + this.props.game.lives);
            this.timer(3000);
        }
        else {
            this.gameOver()
        }

    },
    timer: function (totaltime) {
        if (!this.props.game.timerInterval) {
            this.props.game.setTimer(totaltime, this)
        }
    },
    gameOver: function () {
      console.log('gg, saving to DB your shitty score', this.props.game.lives);
      this.props.game.gameState = 'over';
      this.setState({gameState: 'over'});
      this.props.gameOver(this.props.game);
    },
    render: function () {
        return (
            React.createElement("div", {className: "game"}, 
                React.createElement(QuestionPanel, {question: this.state.question}), 
                React.createElement(TimerBar, {width: this.state.timer}), 
                React.createElement(ChampionBoard, {champions: this.state.champions, gameController: this.gameController}), 
                React.createElement(InfoBoard, {lives: this.props.game.lives, difficulty: this.props.game.difficulty, points: this.props.game.points})
            )
        )
    }
});

React.render(React.createElement(GameWrap, null),
 document.getElementById('game-wrap'));
React.render(React.createElement(ScoreBoard, null),
 document.getElementById('scoreboard-wrap'));
