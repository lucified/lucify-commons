
var React = require('react');

var Appear = require('./react-appear.jsx');
var HideableContainer = require('./hideable-container.jsx');


var VisibleOnAppear = React.createClass({


  getDefaultProps: function() {
    return {invisibleHeight: 0};
  },

  getInitialState: function() {
    return {visible: false};
  },

  onAppear: function() {
    this.setState({visible: true});
    //console.log("on appear");
  },


  render: function() {
    var minHeight = !this.state.visible ? this.props.invisibleHeight : 0;
    return (
      <div style={{minHeight: minHeight}}>
        <Appear onAppear={this.onAppear} />
        <HideableContainer {...this.props} visible={this.state.visible} />
      </div>
    );
  }

});


module.exports = VisibleOnAppear;
