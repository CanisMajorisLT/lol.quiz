var React = require('react/addons');

var ChampionChoiceBoard = React.createClass({displayName: "ChampionChoiceBoard",
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
            champions.push(React.createElement(Champion, {key: id, id: championId, imgageName: imageName, passCC: this.props.gameController}))
        }

        return (
            React.createElement("div", {id: "championChoiceBox"}, 
                champions
            )
        )
    }
});

var Champion = React.createClass({displayName: "Champion",
    chose: function () {
      console.log('chose got triggered', this.props.id);
      this.props.passCC(this.props.id)
    },
    render: function () {
        var imgDest = "/images/champion-icons/" + this.props.imgageName;
        return (
        React.createElement("div", {className: "select-champion"}, 
            React.createElement("img", {src: imgDest, onClick: this.chose, name: this.props.name})
        )
        )
    }
});

module.exports = ChampionChoiceBoard;