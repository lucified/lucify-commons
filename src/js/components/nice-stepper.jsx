
var React = require('react');
var _ = require('underscore');

var NiceButton = require('./nice-button.jsx');


var NiceStepper = React.createClass({


  handleNext: function() {
    this.props.onChange(this.props.step + 1);
  },


  handlePrev: function() {
    this.props.onChange(this.props.step - 1);
  },


  getStepNumber: function(index){
    if (index == this.props.step) {
      return <td className="nice-stepper__current-number" key={index}>{index}</td>;
    } else {
      return <td className="nice-stepper__number" key={index}>{index}</td>;
    }
  },


  getStepNumbers: function(){
    return _.range(this.props.min, this.props.max + 1).map(function(value){
      return this.getStepNumber(value);
    }.bind(this));
  },


  render: function(){

    return (
      <table className="nice-stepper" style={{"width": "auto"}}>
        <tr>
          <td className="nice-stepper__prev">
            <NiceButton
              className="nice-stepper__button"
              disabled={this.props.step == 1}
              onClick={this.handlePrev}>
              Edellinen
            </NiceButton>
          </td>
          {this.getStepNumbers()}
          <td className="nice-stepper__next">
            <NiceButton
              className="nice-stepper__button"
              disabled={this.props.step == this.props.max}
              onClick={this.handleNext}>
              Seuraava
            </NiceButton>
          </td>
        </tr>
      </table>
    );

  }

});

module.exports = NiceStepper;
