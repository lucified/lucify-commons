
var React = require('react');
var _ = require('underscore');

var ResponsiveDecorator = require('lucify-commons/src/js/decorators/responsive-decorator.jsx');
var assets = require('../lucify-assets.js');


var SoccerFields = React.createClass({

  displayName: 'SoccerFields',


	getSoccerFields: function(count) {

		var imgs = _.range(0, count).map(function(index) {
			return <img
				style={{
					boxSizing: "content-box",
					width: this.getSoccerFieldWidth(),
					height: this.getSoccerFieldHeight(),
					paddingLeft: this.getSoccerFieldPadding(),
					paddingRight: this.getSoccerFieldPadding()
				}}
				key={index} src={assets.img('soccer-field.svg')} />;
		}.bind(this));

		return (
			<div className="soccer-fields"
				style={{
					width: this.props.width,
					marginLeft: -this.getSoccerFieldPadding(),
					marginRight: -this.getSoccerFieldPadding()
				}}>
				{imgs}
			</div>
		);
	},


	getWidth: function() {
		return this.props.width;
	},


	getFullFieldWidth: function() {
		return this.getWidth() / this.getRowFieldCount();
	},


	getSoccerFieldWidth: function() {
		return this.getFullFieldWidth() * 0.9;
	},

	getSoccerFieldHeight: function() {
		return this.getSoccerFieldWidth() * 95 / 141.031;
	},


	getRowFieldCount: function() {
		return Math.max(7, Math.floor(this.props.width / 100));
	},


	getSoccerFieldPadding: function() {
		var paddingSpace = this.getWidth() - this.getRowFieldCount() * this.getSoccerFieldWidth();
		return paddingSpace / this.getRowFieldCount() / 2;
	},


	render: function() {
		return this.getSoccerFields(this.props.count);
	}

});


module.exports = ResponsiveDecorator(SoccerFields);
