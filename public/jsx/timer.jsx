/**
 * Created by vyt on 2015-03-14.
 */

var React = require('react');


var TimerBar = module.exports = React.createClass({
    render: function () {
        var style = {width: this.props.width + '%'};
        return (
            <div className="timer-wrap">
                <div className="progress">
                    <div className="determinate" style={style}></div>
                </div>
            </div>
        )
    }
});