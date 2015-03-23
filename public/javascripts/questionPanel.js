/**
 * Created by vyt on 2015-03-12.
 */
var React = require('react');

var QuestionPanel = React.createClass({displayName: "QuestionPanel",
    shouldComponentUpdate: function (nextProps) {
        return this.props.question !== nextProps.question
    },
    render: function () {
        return (
            React.createElement("div", {id: "question-panel"}, 
                React.createElement("span", {id: "question-text"}, this.props.question)
            )
        )
    }
});

module.exports = QuestionPanel;