
var React = require('react');
var classNames = require('classnames');


var Legend = React.createClass({

  displayName: 'Legend',

  propTypes: {
    items: React.PropTypes.array,
    itemsPerRow: React.PropTypes.number,
    reverse: React.PropTypes.bool,
    grid: React.PropTypes.bool,
    vertical: React.PropTypes.bool
  },


  getDefaultProps: function(){
    return {
      reverse: false,
      itemsPerRow: 1,
      grid: true
    };
  },


  getLegendItem: function(text, color, index){

    var style = {
      backgroundColor: color
    };

    var colWidth = Math.floor(12 / this.props.itemsPerRow);

    var classes = classNames(
      'col-xs-' + colWidth, {'nice-legend__no-grid': !this.props.grid}
    );

    return (
      <div key={index} className={classes}>
        <table className="nice-legend" style={{'width': 'auto'}}>
          <tr>
            <td><div className="nice-legend-box" style={style} /></td>
            <td><div className="nice-legend-text">{text}</div></td>
          </tr>
        </table>
      </div>
    );

  },


  getLegendItems: function(){
    var items = this.props.items.map(function(item, index) {
      return this.getLegendItem(item.text, item.color, index);
    }.bind(this));

    if (this.props.reverse) {
      return items.reverse();
    }

    return items;
  },


  render: function() {
    var c = this.props.vertical ? '' : 'row middle-xs';

    return (
      <div className="legend">
        <div className={c}>
          {this.getLegendItems()}
        </div>
      </div>
    );
  }


});


module.exports = Legend;
