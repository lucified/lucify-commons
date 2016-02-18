
var React = require('react');

var utils = require('../lucify-utils.jsx');
var NiceButton = require('./nice-button.jsx');



var UberProtection = function(Component, hash) {

	return React.createClass({

    displayName: 'UberProtection',


		getDefaultProps: function() {
			return {
				hash: hash
			};
		},

		getInitialState: function() {
			return {
				failedAttempt: false,
				passed: false,
			};
		},


		getInputPasswordHash: function() {
			var s = React.findDOMNode(this.refs.passwordField).value;
			return utils.sha512(s);
		},


		handleClick: function() {
			if (this.props.hash == this.getInputPasswordHash()) {
				this.setState({passed: true});
			} else {
				this.setState({failedAttempt: true});
			}
		},


		handleChange: function() {
			this.setState({failedAttempt: false});
		},


		getFailedAttempt: function() {
			if (this.state.failedAttempt) {
				return <div className="uber-protection__invalid-password">Invalid password</div>;
			}
		},


		accessGranted: function() {
			if (utils.getEnvironment() == "local") {
				return true;
			}
			return this.state.passed;
		},


		render: function() {
			if (this.accessGranted()) {
				return <Component {...this.props} />;
			}

			return (
				<div className="uber-protection">
					<div className="uber-protection__enter-password">Enter password</div>
					<input onChange={this.handleChange} className="password" type="password" ref="passwordField" />
					<NiceButton onClick={this.handleClick} >
						Login
					</NiceButton>

					{this.getFailedAttempt()}
				</div>
			);

		}

	});


};


module.exports = UberProtection;
