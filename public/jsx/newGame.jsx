var React = require('react');

var NewGame = module.exports = React.createClass({
    render: function () {
        return (

            <div style={this.props.styleNext} className="gameOver valign-wrap">
                    <button className="btn waves-effect waves-light btn-large new-game" onClick={this.props.newGame}>Start new game <i className="mdi-action-cached right"></i></button>
            </div>
        )
    }
});