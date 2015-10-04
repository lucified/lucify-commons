
var React = require('react');
var OnScroll = require('react-window-mixins').OnScroll;
var OnResize = require("react-window-mixins").OnResize;


var Appear = React.createClass({

  mixins: [ OnScroll, OnResize],


  componentDidMount: function() {
    this.appeared = false;
    this.setState({offsetTop: this.getDOMNode().offsetTop});
  },


  componentDidUpdate: function() {
    if (!this.appeared && this.topIsVisible()) {
        this.appeared = true;
        if (this.props.onAppear) {
          this.props.onAppear();
        }
    }
  },

  getDistance: function() {
    return this.state.offsetTop - this.state.scroll.y - this.state.window.height;
  },


  topIsVisible: function() {
    return this.getDistance() < 0;
  },


  render: function() {

    return <div />;

    // var visText = this.topIsVisible() ? "true" : "false";

    // return (
    //   <div>
    //     <ul>
    //       <li>offsetTop: {this.state.offsetTop}</li>
    //       <li>scroll.y: {this.state.scroll.y}</li>
    //       <li>window.height: {this.state.window.height}</li>
    //       <li>distance: {this.getDistance()}</li>
    //       <li>topIsVisible: {visText}</li>

    //     </ul>
    //   </div>
    // );
  }

});


module.exports = Appear;