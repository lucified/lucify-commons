


var React = require('react');

var Appear = require('./react-appear.jsx');
var HideableContainer = require('./hideable-container.jsx');


var VisibleOnAppear = React.createClass({


  getDefaultProps: function() {
    return {invisibleHeight: 0}
  },

  getInitialState: function() {
    return {visible: false};
  },

  onAppear: function() {
    this.setState({visible: true});
    //console.log("on appear");
  },


  render: function() {
    var minHeight = !this.state.visible ? this.props.invisibleHeight : 0;
    //console.log("height is" + minHeight);
    return (
      <div style={{minHeight: minHeight}}>
        <Appear onAppear={this.onAppear} />
        <HideableContainer {...this.props} visible={this.state.visible} />
      </div>
    );

    // var visText = this.topIsVisible() ? "true" : "false";

    // return (
    //   <div>
    //     <ul>
    //       <li>offsetTop: {this.state.offsetTop}</li>
    //       <li>scroll.y: {this.state.scroll.y}</li>
    //       <li>window.height: {this.state.window.height}</li>
    //       <li>distance: {this.getDistance()}</li>
    //       <li>topIsVisible: {visText}</li>

    //     </ul>
    //   </div>
    // );
  }

});


module.exports = VisibleOnAppear;