var React = require('react');

var Board = React.createClass({displayName: "Board",
    shouldComponentUpdate: function (nextProps) {
      return this.props.points !== nextProps.points || this.props.lives !== nextProps.lives || this.props.difficulty !== nextProps.difficulty
    },
    render: function () {
        console.log('rendering infoboard');
        var lives = this.props.lives;
        var difficulty = this.props.difficulty;
        var score = this.props.points;
        return (
            React.createElement("div", {className: "infoboard-wrap"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col s4"}, React.createElement(Element, {elName: "lives", elNumber: lives, color: "red"})), 
                    React.createElement("div", {className: "col s4"}, React.createElement(Element, {elName: "difficulty", elNumber: difficulty, color: "yellow"})), 
                    React.createElement("div", {className: "col s4"}, React.createElement(Element, {elName: "score", elNumber: score, color: "green"}))
                )
            )
        )
    }
});

var Element = React.createClass({displayName: "Element",
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
            React.createElement("span", {id: this.props.elName, className: this.state.cls}, this.props.elName, ": ", this.props.elNumber)
        )
    }
});

module.exports = Board;