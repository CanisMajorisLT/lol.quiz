var staticData = require('./staticChampions');
var _ = require('lodash');

var Questions = module.exports = function GameLogic () {
    this.asked = [];
    this._championIds = _.shuffle(staticData.championIds);

};
/*Difficulty levels can be from 1 to 4,
* source: 's' - for static (algorithm generated), 'm' - for man made*/
Questions.prototype.nextQuestion = function nextQuestion (difficulty, source) {
   // cia poto galima ir daugiau klausimu is to paties championo
  var allQuestionData = {question: '', correctAnswer: '', champions: []};

  var championId = this._championIds.pop();
  var data = staticData.champions[championId];
  var question = data.title;
  var correctAnswer = data.id;

  var allAnswerChampions = this._randomChampions((difficulty * 6) -1, correctAnswer);
  allAnswerChampions.push({id: data.id, imgName: data.image.full});
  allAnswerChampions = _.shuffle(allAnswerChampions);
  allQuestionData.question = question;
  allQuestionData.correctAnswer = correctAnswer;
  allQuestionData.champions = allAnswerChampions;
  return allQuestionData


};

Questions.prototype._randomChampions = function _randomChampion (howMany, avoidId) {
    var ids = _.sample(staticData.championIds, howMany + 1);
    if (_.includes(ids, String(avoidId))) {
        console.log('includes the same');
        _.remove(ids, function (x) {
            return x == avoidId
        });
    }
    else ids.pop();
    return ids.map(function (id) {
        return {id: id, imgName: staticData.champions[id].image.full}
    });
};

