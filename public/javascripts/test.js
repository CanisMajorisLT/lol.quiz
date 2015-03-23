/**
 * Created by vyt on 2015-03-13.
 */
var _ = require('lodash');
var game = require('./game');
var Questions = require('./questions');
var staticC = require('./staticChampions');

var champs = [];

for (var c in staticC.champions){
    champs.push(staticC.champions[c].image.full)
}

console.log(champs);