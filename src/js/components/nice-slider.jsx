
var React = require('react');

var noUiSlider = require('./nouislider.js');


module.exports = React.createClass({

  displayName: 'NiceSlider',

  propTypes: {
    defaultValue: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func
  },


  getDefaultProps: function() {
    return {
      defaultValue: 0
    };
  },


  componentDidMount: function() {
    // TODO: use ReactDOM once we upgrade to React 0.14
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
