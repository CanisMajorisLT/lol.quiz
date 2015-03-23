var React = require('react');

var SavePanel = module.exports = React.createClass({displayName: "exports",
    save: function () {

      var name = React.findDOMNode(this.refs.nickName).value;
      console.log('name', name);
      $.post('/data/save', {score: this.props.data.points, name: name.slice(0, 25)});
      this.props.next()
    },
    cancel: function () {
      this.props.next()
    },
    render: function () {
        return (
        React.createElement("div", {style: this.props.style, className: "gameOver"}, 
            React.createElement("h5", null, "Game over :("), 
            React.createElement("div", null, "Your score: ", this.props.data.points), 
            React.createElement("div", {className: "input-field"}, 
                React.createElement("label", {for: "nick"}, "Name"), 
                React.createElement("input", {id: "nick", type: "text", ref: "nickName"})
            ), 
                    React.createElement("button", {className: "btn waves-effect waves-light", onClick: this.save}, "Save"), 
                    React.createElement("button", {className: "btn waves-effect waves-light", onClick: this.cancel}, "Cancel")

        )

        )
    }
});