
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


module.exports = React.createClass({

  displayName: 'LinkButton',

  propTypes: {
    to: React.PropTypes.string
  },

  render: function() {

    return <Link to={this.props.to}>
        <span className="nice-button">{this.props.children}</span>
      </Link>;

  }

});
