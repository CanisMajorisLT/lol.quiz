var React = require('react/addons');

var ChampionChoiceBoard = React.createClass({
    shouldComponentUpdate: function (nextProps) {
        return this.props.champions !== nextProps.champions
    },

    componentDidUpdate: function () {
      console.log('all champs rendereed');
    },
    render: function () {
        var champions = [];
        for (var id in this.props.champions) {
            var champ = this.props.champions[id];
            var championId = champ.id;
            var imageName = champ.imgName;
            champions.push(<Champion key={id} id={championId} imgageName={imageName} passCC={this.props.gameController}/>)
        }

        return (
            <div id="championChoiceBox">
                {champions}
            </div>
        )
    }
});

var Champion = React.createClass({
    chose: function () {
      console.log('chose got triggered', this.props.id);
      this.props.passCC(this.props.id)
    },
    render: function () {
        var imgDest = "/images/champion-icons/" + this.props.imgageName;
        return (
        <div className="select-champion">
            <img src={imgDest} onClick={this.chose} name={this.props.name}/>
        </div>
        )
    }
});

module.exports = ChampionChoiceBoard;