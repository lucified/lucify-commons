
var React = require('react');

var Appear = require('./react-appear.jsx');
var HideableContainer = require('./hideable-container.jsx');


var VisibleOnAppear = React.createClass({

  displayName: 'VisibleOnAppear',

  propTypes: {
    invisibleHeight: React.PropTypes.number
  },


  getDefaultProps: function() {
    return {
      invisibleHeight: 0
    };
  },

  getInitialState: function() {
    return {
      visible: false
    };
  },

  onAppear: function() {
    this.setState({visible: true});
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
