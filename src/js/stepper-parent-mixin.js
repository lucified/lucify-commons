

var StepperParent = {

  getInitialState: function() {
    return {step: 1};
  },

  handleStepChange: function(value) {
    this.setState({step: value});
  }

}

module.exports = StepperParent;