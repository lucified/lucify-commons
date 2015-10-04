

var React = require('react');
var ComponentWidthMixin = require('./container-width-mixin.js');


var ResponsiveRow = React.createClass({


  mixins: [ComponentWidthMixin],


  renderChildren: function () {
    return React.Children.map(this.props.children, function (child) {
      return React.addons.cloneWithProps(child, {
          rowWidth : this.clientWidth
      })
    }.bind(this))
  },


  render: function() {
    return <div>{this.renderChildren()}</div>
  } 


});




//<ResponsiveRow>
//  <ResponsiveCol spec={[0], [200, 6], [300, 8], [400, 8]}>
//
//  </ResponsiveCol>
//</ResponsiveRow>

