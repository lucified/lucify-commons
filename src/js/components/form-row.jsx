

var React = require('react');

var FormRow = React.createClass({

  render: function() {
    return (
      <div className="row middle-xs form__row">
          <div className="col-xs-3 form__title">
            {this.props.left}
          </div>
          <div className="col-xs">
            {this.props.right}
          </div>
      </div>
    );
  }

});

module.exports = FormRow;