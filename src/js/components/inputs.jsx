
var React = require('react');


var Inputs = React.createClass({

	render: function() {
		return (
			<div className="inputs">
				{this.props.children}
			</div>
		);
	}

});


module.exports = Inputs;