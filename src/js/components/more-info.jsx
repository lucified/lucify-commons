
var React = require('react');


module.exports = React.createClass({

  displayName: 'MoreInfo',


  getInitialState: function() {
    return {
      opened: false
    };
  },


  onClick: function() {
    console.log("clicked");
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
