
var React = require('react');
var OnResize = require('react-window-mixins').OnResize;
var d3 = require('d3');


module.exports = React.createClass({


  mixins: [OnResize],


  getInitialState: function() {
    return {
      height: 10
    };
  },


  getHeight: function() {
    var ret = 0;

    d3.select(this.getDOMNode())
      .selectAll(".content")
      .each(function() {
        ret = Math.max(this.getBoundingClientRect().height, ret);
      });
    return ret;
  },


  updateHeight: function() {
    this.setState({height: this.getHeight()});
  },


  componentDidMount: function() {
    this.updateHeight();
  },


  onResize: function() {
    this.updateHeight();
  },


  getContent: function(step) {
    var style = {
      opacity: step == this.props.currentStep ? 1 : 0
    };

    return (
        <div key={step} className="content" style={style}>
          {this.props.children[step - 1]}
        </div>
      );
  },


  getAllContent: function() {
    return this.props.children.map(function(val, i) {
      return this.getContent(i + 1);
    }.bind(this));
  },


  render: function() {
    return (
      <div className="fixed-height-stepper-explanation" style={this.state}>
        {this.getAllContent()}
      </div>
    );
  }


});
