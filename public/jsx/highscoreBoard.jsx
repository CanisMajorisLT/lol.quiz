var React = require('react');
var _ = require('lodash');

var Scoreboard = module.exports = React.createClass({
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
            scores.push(<Result key={index} score={item[1]} name={item[0]}/>)
        });
        return (
            <div clasName="scoreboard-wrap">
            <h5>Top 15:</h5>
                <ol>
                    {scores}
                </ol>
            </div>
        )
    }
});

var Result = React.createClass({
    render: function () {
        return (
            <li>{this.props.score} : {this.props.name}</li>
        )
    }
});