var React = require('react');

var NewGame = module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (

            React.createElement("div", {style: this.props.styleNext, className: "gameOver valign-wrap"}, 
                    React.createElement("button", {className: "btn waves-effect waves-light btn-large new-game", onClick: this.props.newGame}, "Start new game ", React.createElement("i", {className: "mdi-action-cached right"}))
            )
        )
    }
});