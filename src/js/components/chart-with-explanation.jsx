
var React = require('react');
var HideableContainer = require('lucify-commons/src/js/components/hideable-container.jsx');

var OnResize = require("react-window-mixins").OnResize;
var DividedCols = require('lucify-commons/src/js/components/divided-cols.jsx');

var ComponentWidthMixin = require('lucify-commons/src/js/components/container-width-mixin.js');


var ChartWithExplanation = React.createClass({

  mixins: [ ComponentWidthMixin ],


  getContents: function() {
    return <DividedCols
      first={this.props.children[0]}
      second={this.props.children[1]}
      inverse={true} />;
  },


  getClassName: function() {
    if (this.componentWidth < 700) {
      return "chart-with-explanation--stacked";
    }

    if (this.componentWidth < 800) {
      return "chart-with-explanation--narrow";
    }

    return "chart-with-explanation";
  },

  render: function() {


      return (
          <HideableContainer
          visible={this.props.visible}
          delay={this.props.delay}
          removeFromDOM={true}>
          <div className={this.getClassName()}>
            {this.getContents()}
          </div>
        </HideableContainer>
      );
  }

});

module.exports = ChartWithExplanation;
