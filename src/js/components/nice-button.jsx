

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


module.exports = React.createClass({

  render: function() {

    return (
      <button type="button" className="nice-button" {...this.props}>
        {this.props.children}
      </button>
    )

  }

});