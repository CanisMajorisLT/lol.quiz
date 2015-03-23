var React = require('react');

var Board = React.createClass({
    shouldComponentUpdate: function (nextProps) {
      return this.props.points !== nextProps.points || this.props.lives !== nextProps.lives || this.props.difficulty !== nextProps.difficulty
    },
    render: function () {
        console.log('rendering infoboard');
        var lives = this.props.lives;
        var difficulty = this.props.difficulty;
        var score = this.props.points;
        return (
            <div className="infoboard-wrap">
                <div className="row">
                    <div className="col s4"><Element elName="lives" elNumber={lives} color="red"/></div>
                    <div className="col s4"><Element elName="difficulty" elNumber={difficulty} color="yellow"/></div>
                    <div className="col s4"><Element elName="score" elNumber={score} color="green"/></div>
                </div>
            </div>
        )
    }
});

var Element = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        console.log('this el vs next el', this.props.elNumber, nextProps.elNumber);
        return this.props.elNumber !== nextProps.elNumber || this.state.cls !== nextState.cls
    },
    getInitialState: function () {
      return {cls: ''}
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.elNumber !== this.props.elNumber) {
            this.setState({cls: "animated bounceIn " + this.props.color + "-text"});
            setTimeout(function () {
               this.setState({cls: ""})
            }.bind(this), 400)
        }

    },
    render: function () {
        return (
            <span id={this.props.elName} className={this.state.cls}>{this.props.elName}: {this.props.elNumber}</span>
        )
    }
});

module.exports = Board;