
var React = require('react');
var OnResize = require('react-window-mixins').OnResize;


var ContainerWidthMixin = {

  displayName: 'ContainerWidthMixin',

  mixins: [OnResize],


  getInitialState: function() {
    return {componentWidth: 0};
  },


  componentDidMount: function() {
    this.mounted = true;
    this.onResize();
  },


  onResize: function() {
    if (this.mounted !== true) {
      return;
    }

    this.componentWidth = this.getDOMNode().clientWidth;

    this.setState({
      componentWidth: this.getDOMNode().clientWidth
    });
  }

};

module.exports = ContainerWidthMixin;
