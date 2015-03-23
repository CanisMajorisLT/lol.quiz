/**
 * Created by vyt on 2015-03-12.
 */
var React = require('react');

var QuestionPanel = React.createClass({
    shouldComponentUpdate: function (nextProps) {
        return this.props.question !== nextProps.question
    },
    render: function () {
        return (
            <div id="question-panel">
                <span id="question-text">{this.props.question}</span>
            </div>
        )
    }
});

module.exports = QuestionPanel;