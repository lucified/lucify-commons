var React = require('react');
var classNames = require('classnames');


var HideableContainer = React.createClass({

  displayName: 'HideableContainer',

  propTypes: {
    visible: React.PropTypes.bool,
    delay: React.PropTypes.number,
    removeFromDOM: React.PropTypes.bool,
    displayNone: React.PropTypes.bool,
    heightZero: React.PropTypes.bool
  },


  getInitialState: function(){
    return {
      visible: false
    };
  },


  getDefaultProps: function(){
    return {
      visible: false,
      delay: 0,
      removeFromDOM: false,
      displayNone: false,
      heightZero: false
    };
  },


  componentWillReceiveProps: function(newProps){
    if (newProps.visible != this.props.visible) {
      setTimeout(function() {
        this.setState({visible: newProps.visible});
      }.bind(this), this.props.delay);
    }
  },


  componentDidMount: function(){
    // Setting state in componentDidMount not recommended. will trigger rerender
    this.setState({visible: this.props.visible});
  },


  getClasses: function(){
    return classNames(
      'hideable-container',
      {
        'hideable-container-visible': this.state.visible
      }
    );
  },


  getContent: function(){
    if (this.props.removeFromDOM && !this.props.visible) {
      return <span />;
    }
    return this.props.children;
  },


  getStyle: function(){
    return {
      display: (this.props.displayNone && !this.props.visible) ? 'none' : 'block',
      height: (this.props.heightZero && !this.props.visible) ? '0' : 'auto'
    };
  },


  render: function(){
    return <div style={this.getStyle()}
      className={this.getClasses()}>{this.getContent()}</div>;
  }

});

module.exports = HideableContainer;
