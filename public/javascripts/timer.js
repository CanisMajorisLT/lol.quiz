/**
 * Created by vyt on 2015-03-14.
 */

var React = require('react');


var TimerBar = module.exports = React.createClass({displayName: "exports",
    render: function () {
        var style = {width: this.props.width + '%'};
        return (
            React.createElement("div", {className: "timer-wrap"}, 
                React.createElement("div", {className: "progress"}, 
                    React.createElement("div", {className: "determinate", style: style})
                )
            )
        )
    }
});