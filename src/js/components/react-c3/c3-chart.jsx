
var React = require('react');
var c3 = require('c3');

var deepcopy = require('deepcopy');
var debounceTime = require('../../debounce-time.jsx');

var _ = require('underscore');

var ComponentWidthMixin = require('../container-width-mixin.js');


var C3Chart = React.createClass({
  

  mixins: [ComponentWidthMixin],

  
  getDefaultProps: function(){
    return {
      slowUpdateDebounceTime: 1000,
      fastUpdateDebounceTime: 5,
      
      slowResizeDebounceTime: 1000,
      fastResizeDebounceTime: 500,
      
      lineStrokeWidth: null,
      aspectRatio: 1.3, // aspectRatio = width / height
      ticksFontSize: 13,
      yTicksSpacing: 5,
    }
  },


  componentDidUpdate: function()  {
    if (this.getUpdateDebounceTime() > 0) {
      this.scheduleUpdateData();
    } else {
      this.updateData();  
    }
    
    this.scheduleResize();
  },


  updateData: function() {
    if (!this.destroyed) {
      try {
        this.chart.load(this.props.data);  
      } catch (err) {
        console.log("catched error at chart.load " + err);
        window.c3err = err;
      }
    }
    ///this.updateStyles();
  },


  resizeChart: function () {
    if (!this.destroyed) {
      try {
        this.chart.resize(this.getSize());
      } catch (err) {
        console.log("catched error at chart.resize " + err);
        window.c3err = err;
      }
    }
  },


  updateStyles: function() {
    if (this.props.lineStrokeWidth) { 
      d3.select(this.getDOMNode())
        .selectAll('.c3-line')
        .style('stroke-width', this.props.lineStrokeWidth);
    }

    d3.select(this.getDOMNode())
      .select('.c3-axis-x').style("stroke-width", "1.5px");

    if (!this.props.spec.axis || !this.props.spec.axis.rotated) {
      d3.select(this.getDOMNode())
        .selectAll('.c3-axis-x .tick text tspan')
        .attr("y", this.props.ticksFontSize);
    }
    
    d3.select(this.getDOMNode())
      .selectAll('.tick text')
        .style("font-size", this.props.ticksFontSize + "px");

    //console.log("updated stypes, ticksFontSize is" + this.props.ticksFontSize);
  },




  getSize: function() {

    var baseWidth = Math.max(200, this.componentWidth);

    var ret = {
      width: baseWidth,
      height: baseWidth / this.props.aspectRatio
    }

    if (this.props.width) {
      ret.width = this.props.width;
    }

    if (this.props.height) {
      ret.height = this.props.height;
    }

    return ret;
  },


  onRendered: function() {
    this.initialRenderReady = true;

    if (!this.destroyed) {
      this.updateStyles();
      if (this.props.onRendered) {
        this.props.onRendered();
      }
    }
  },

  getUpdateDebounceTime: function() {
    return debounceTime(
        this.props.slowUpdateDebounceTime,
        this.props.fastUpdateDebounceTime);
  },


  getResizeDebounceTime: function() {
    return debounceTime(
        this.props.slowResizeDebounceTime,
        this.props.fastResizeDebounceTime);
  },


  componentDidMount: function() {
    var fullSpec = deepcopy(this.props.spec);
    fullSpec.bindto = React.findDOMNode(this.refs.chart);
    fullSpec.data = this.props.data;
    fullSpec.size = this.getSize();

    fullSpec.onrendered = this.onRendered;

    this.chart = c3.generate(fullSpec);

    this.scheduleResize = _.debounce(function() {
        this.resizeChart();
      }, this.getResizeDebounceTime());

    this.scheduleUpdateData = _.debounce(function() {
      this.updateData();
    }, this.getUpdateDebounceTime());
  },


  componentWillUnmount: function() {
    this.destroyed = true;
    this.chart.destroy();
  },


  render: function(){
    return (
      <div className="c3-chart">
        <div ref="chart" />
      </div>
    )
  }


});


module.exports = C3Chart;