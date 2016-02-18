
var React = require('react');
var OnScroll = require('react-window-mixins').OnScroll;
var OnResize = require('react-window-mixins').OnResize;


var Appear = React.createClass({

  displayName: 'Appear',

  propTypes: {
    onAppear: React.PropTypes.func
  },

  mixins: [OnScroll, OnResize],


  componentDidMount: function() {
    this.appeared = false;
    // Setting state in componentDidMount not recommended. will trigger rerender
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
  }

});


module.exports = Appear;
