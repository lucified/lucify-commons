
var React = require('react');


module.exports = React.createClass({

  displayName: 'NiceButton',


  render: function() {
    return (
      <button type="button" className="nice-button" {...this.props}>
        {this.props.children}
      </button>
    );
  }

});
