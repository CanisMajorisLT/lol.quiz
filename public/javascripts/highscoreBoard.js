var React = require('react');
var _ = require('lodash');

var Scoreboard = module.exports = React.createClass({displayName: "exports",
    getInitialState: function () {
        return {scores: [[100, 'tenis']]}
    },
    componentDidMount: function () {
      $.get('/data/scores')
        .done(function (data) {
              this.setState({scores: _.chunk(data, 2).reverse()});
              console.log('got scores', this.state.scores);
          }.bind(this))
    },
    render: function () {
        var scores = [];
        this.state.scores.forEach(function (item, index) {
            scores.push(React.createElement(Result, {key: index, score: item[1], name: item[0]}))
        });
        return (
            React.createElement("div", {clasName: "scoreboard-wrap"}, 
            React.createElement("h5", null, "Top 15:"), 
                React.createElement("ol", null, 
                    scores
                )
            )
        )
    }
});

var Result = React.createClass({displayName: "Result",
    render: function () {
        return (
            React.createElement("li", null, this.props.score, " : ", this.props.name)
        )
    }
});