
var React = require('react');


module.exports = React.createClass({

  displayName: 'MoreInfo',

  propTypes: {
    initial: React.PropTypes.string
  },


  getInitialState: function() {
    return {
      opened: false
    };
  },


  onClick: function() {
    this.setState({opened: true});
  },


  render: function() {
    if (!this.state.opened) {
      return (
        <a onClick={this.onClick}>{this.props.initial}</a>
      );

    } else {
      return <span>{this.props.children}</span>;
    }
  }

});
