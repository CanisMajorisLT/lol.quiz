var React = require('react');

var SavePanel = module.exports = React.createClass({
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
        <div style={this.props.style} className="gameOver">
            <h5>Game over :(</h5>
            <div>Your score: {this.props.data.points}</div>
            <div className="input-field">
                <label for="nick">Name</label>
                <input id="nick"type="text" ref="nickName"/>
            </div>
                    <button className="btn waves-effect waves-light" onClick={this.save}>Save</button>
                    <button className="btn waves-effect waves-light" onClick={this.cancel}>Cancel</button>

        </div>

        )
    }
});