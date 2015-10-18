
var React = require('react');
var d3 = require('d3');

var Loading = React.createClass({


	getDefaultProps: function() {
		return {
			progress: null
		}
	},


	getPercentage: function() {
		if (this.props.progress === null) {
			return null;
		}
		return <span className="loading__percentage">({this.props.progress} %)</span>;
	},
	

	render: function() {
		return (
			<div className="loading">

				 <div className="loading__img">
				 	<img src="images/loading-spinner.gif" />
				 </div>
				 <div className="loading__text">Loading... {this.getPercentage()}</div>
			</div>
		)
	}

});


module.exports = Loading;


//<ReactLoading type='bars' color='#e3e3e3' />
