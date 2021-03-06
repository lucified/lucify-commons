
var React = require('react');
var OnResize = require('react-window-mixins').OnResize;


var TwoResponsiveCols = React.createClass({

  displayName: 'TwoResponsiveCols',

  propTypes: {
    breakPoint: React.PropTypes.number,
    inverse: React.PropTypes.bool,
    gapClass: React.PropTypes.string,
    alignmentClass: React.PropTypes.string,
    first: React.PropTypes.node,
    second: React.PropTypes.node
  },

  mixins: [OnResize],


  getInitialState: function() {
    return {
      componentWidth: 0
    };
  },


  getDefaultProps: function() {
    return {
      breakPoint: 500,
      inverse: false,
      gapClass: 'two-responsive-cols__gap',
      alignmentClass: 'top-xs'
    };
  },


  onResize: function() {
    if (!this.getDOMNode()) {
      return;
    }
    this.setState({
      // TODO: use ReactDOM once we upgrade to React 0.14
      componentWidth: React.findDOMNode(this).clientWidth
    });
  },


  getPossibleGap: function() {
    if (this.state.componentWidth < this.props.breakPoint) {
      return <div className={this.props.gapClass}>&nbsp;</div>;
    }
    return null;
  },



  getContents: function() {
    var colClass = this.state.componentWidth < this.props.breakPoint ?
      'col-xs-12' : 'col-xs-6';

    return (
      <div className={'row ' + this.props.alignmentClass}>
        <div className={colClass + ' two-responsive-cols__first'}>
          {this.props.first}
        </div>
        {this.getPossibleGap()}
        <div className={colClass + ' two-responsive-cols__last'}>
          {this.props.second}
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div className="two-responsive-cols">
        {this.getContents()}
      </div>
    );
  }

});


module.exports = TwoResponsiveCols;
