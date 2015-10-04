
var React = require('react');
var OnResize = require("react-window-mixins").OnResize;

var ComponentWidthMixin = require('./container-width-mixin.js');


var DividedCols = React.createClass({


    mixins: [ ComponentWidthMixin ],


    getDefaultProps: function() {
      return {
        breakPointStacked: 700,
        breakPointNarrow: 800,
        inverse: false,
        alignmentClass: "top-xs",
      }
    },


    getPrefix: function() {
      if (this.componentWidth < this.props.breakPointStacked) {
        return "divided-cols--stacked__";
      }

      if (this.componentWidth < this.props.breakPointNarrow) {
        return "divided-cols--narrow__";
      }

      return "divided-cols__";
    },


    getClassName: function(suffix) {
      return this.getPrefix() + suffix;
    },


    getFirst: function() {
      if (this.props.inverse && this.componentWidth < this.props.breakPointStacked) {
        return this.props.second;
      }
      return this.props.first;
    },


    getSecond: function() {
      if (this.props.inverse && this.componentWidth < this.props.breakPointStacked) {
        return this.props.first;
      }
      return this.props.second;
    },


    render: function() {
      if (!this.componentWidth) {
         return <div />;
      }

      return (
        <div className={this.getClassName('parent')}>
            <div className={this.getClassName('first')}>
              {this.getFirst()}
            </div>
            <div className={this.getClassName('second')}>
              {this.getSecond()}
            </div>
        </div>
      );
    }

});


module.exports = DividedCols;


      // if (this.componentWidth < this.props.breakPoint) {
      //   return (
      //     <div className="divided-cols--stacked">
      //       <div className="divided-cols--stacked__first">
      //         {this.props.first}
      //       </div>
      //       <div className="divided-cols--stacked__second">
      //         {this.props.second}
      //       </div>
      //     </div>
      //   );
      // }

      // return (
      //     <div className="divided-cols">
      //       <div className="divided-cols__first">
      //         {this.props.first}
      //       </div>
      //       <div className="divided-cols__second">
      //         {this.props.second}
      //       </div>
      //     </div>
      // );
