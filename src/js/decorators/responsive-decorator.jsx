
var React = require('react');

var ComponentWidthMixin = require('lucify-commons/src/js/components/container-width-mixin.js');


// TODO: this should be modified so that it
//
// (1) does not use mixins
// (2) makes sure resize events are trigged
//     in the correct order


module.exports = function(Component) {

  var ResponsiveDecorator = React.createClass({

    displayName: 'ResponsiveDecorator',

    mixins: [ComponentWidthMixin],

    getWidth: function() {
      return this.state.componentWidth;
    },

    render: function() {
      if (!this.getWidth()) {
        return <div />;
      }

      return (
        <div className="responsive-decorator">
          <Component {...this.props} width={this.getWidth()} />
        </div>
      );
    }

  });

  return ResponsiveDecorator;
};
