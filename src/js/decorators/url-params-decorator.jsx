
var React = require('react');
var queryString = require('query-string');


var decode = function(query) {
  var ret = {};

  for (var key in query) {
    var val = query[key];

    if (val == 'false') {
      val = false;

    } else if (val == 'true') {
      val = true;

    } else if (isFinite(val)) {
      val = Number(val);

    }

    ret[key] = val;
  }

  return ret;
};


var UrlParamsDecorator = function(Component) {
  return React.createClass({

    displayName: 'UrlParamsDecorator',

    getUrlParams: function() {
      return decode(queryString.parse(location.search));
    },

    render: function() {
      return <Component {...this.props} {...this.getUrlParams()} />;
    }
  });
};


module.exports = UrlParamsDecorator;
