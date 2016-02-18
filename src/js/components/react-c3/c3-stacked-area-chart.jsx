
var React = require('react');
var _ = require('underscore');
var C3Chart = require('../react-c3/c3-chart.jsx');
var deepcopy = require('deepcopy');

var theme = require('../../lucify-theme.jsx');

var C3StackedAreaChart = React.createClass({

  displayName: 'C3StackedAreaChart',

  propTypes: {
    xVals: React.PropTypes.array,
    colors: React.PropTypes.arrayOf(React.PropTypes.string),
    seriesDefs: React.PropTypes.array,
    spec: React.PropTypes.object,
    data: React.PropTypes.object
  },


  getDataTemplate: function(){
    return {
      type: 'line',
      x: 'x',
      columns: [['x'].concat(this.props.xVals)]
    };
  },


  getColors: function(){
    if (this.props.colors != null) {
      return this.props.colors;
    }

    if (this.props.seriesDefs.length == 6) {
      return ['#26a69a', '#80cbc4', '#e0f2f1',
        '#c5cae9','#7986cb', '#3f51b5'];
    }

    return theme.cyanToGreen8;
  },


  getColor: function(index){
    return this.getColors()[index];
  },


  getColorsObject: function() {
    return _.object(this.props.seriesDefs.map(function(item, index){
      return [item.name, this.getColor(index)];
    }.bind(this)));
  },


  getData: function() {
    var ret = this.getDataTemplate();

    var seriesDefs = this.props.seriesDefs;

    ret.types = _.object(seriesDefs.map(function(item){
      return [item.name, 'area'];
    }));

    ret.groups = [
      seriesDefs.map(function(item) {
        return item.name;
      })
    ];

    ret.colors = this.getColorsObject();
    ret.order = null;

    if (!this.props.data) {
      return ret;
    }

    var allData = this.props.data;

    var xSeries = ['x'].concat(this.props.xVals);
    var actualSeries = seriesDefs.map(function(item) {
      return [item.name].concat(allData[item.series]);
    });

    ret.columns = [xSeries].concat(actualSeries);

    return ret;
  },


  getSpec: function() {
    var newSpec = deepcopy(this.props.spec);

    return newSpec;
  },


  render: function(){
    return <C3Chart data={this.getData()} spec={this.getSpec()} />;
  }

});


module.exports = C3StackedAreaChart;
