
var React = require('react');
var c3 = require('c3');
var _ = require('underscore');
var C3Chart = require('../react-c3/c3-chart.jsx');
var deepcopy = require('deepcopy');

var theme = require('../../lucify-theme.jsx');

var C3StackedAreaChart = React.createClass({


  getDataTemplate: function(){
    return {
        type: "line",
        x: 'x',
        columns: [ ['x'].concat(this.props.xVals) ]
    }
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
      
    // var colors = [
    //   'rgba(24, 183, 183, 1.0)', 
    //   'rgba(24, 183, 183, 0.8', 
    //   'rgba(24, 183, 183, 0.5', 
    //   'rgba(24, 183, 183, 0.3', 
    //   'rgba(96, 196, 114, 0.1)',
    //   'rgba(96, 196, 114, 0.3)',
    //   'rgba(96, 196, 114, 0.6)',
    //   'rgba(96, 196, 114, 1.0)'];
    
    // return colors;
    // // // cyan to green
    // // var colors = [
    // //   '#18b7b7',
    // //   '#5ccccc',
    // //   '#a2e2e2',
    // //   '#DFF3E3',
    // //   '#9FDBAA',
    // //   '#60C472',
    // //   ''
    // // ];

    // if (this.props.seriesDefs.length == 8 || true) {
    //      return ['#00897b', '#26a69a', '#80cbc4', '#e0f2f1', 
    //       '#c5cae9','#7986cb', '#3f51b5', '#303f9f'];
    //}
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
    ]

    ret.colors = this.getColorsObject();
    ret.order = null;

    if (!this.props.data) {
      return ret;
    }
    
    var allData = this.props.data;

    var xSeries = ['x'].concat(this.props.xVals);
    var actualSeries = seriesDefs.map(function(item) {
      return [item.name].concat(allData[item.series]);
    })

    ret.columns = [xSeries].concat(actualSeries);

    return ret;  
  },


  getSpec: function() {
    var newSpec = deepcopy(this.props.spec);

    return newSpec;
  },


  render: function(){
    return <C3Chart data={this.getData()} spec={this.getSpec()} />
  }


});


module.exports = C3StackedAreaChart;
