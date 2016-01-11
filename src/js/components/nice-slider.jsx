
var React = require('react');

var noUiSlider = require('./nouislider.js');


module.exports = React.createClass({


  getDefaultProps: function() {
    return {
      defaultValue: 0
    };
  },


  componentDidMount: function() {
    var slider = React.findDOMNode(this.refs.slider);

    var settings = {
      start: [this.props.defaultValue],
      range: {
        'min': this.props.min,
        'max': this.props.max
      }
    };

    if (this.props.step != null) {
      settings.step = this.props.step;
    }

    noUiSlider.create(slider, settings);

    slider.noUiSlider.on('update', function() {
      var value = Math.round(slider.noUiSlider.get());

      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }.bind(this));
  },


  render: function() {
    return (
      <div className="nice-slider">
        <div ref="slider" />
      </div>
    );
  }

});
