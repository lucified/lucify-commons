

var React = require('react');
var Hider = require('./element-query-hider.jsx');


module.exports = function(ChartComponent, SmallChartComponent) {


  return React.createClass({


    getDefaultProps: function() {
      return {
        largeCols: 4,
        mediumCols: 6
      }
    },


    renderItemForLarge: function(item, index) {
      return (
          <div key={index} className={"col-xs-" + this.props.largeCols}>
            <div className="multiples__large-item">
              <div className="multiples__title">{item.title}</div>
              <ChartComponent {...this.props} {...item.chartProps} />
            </div>
          </div>
      )
    },

    renderItemForMedium: function(item, index) {
      return (
          <div key={index} className={"col-xs-" + this.props.mediumCols}>
            <div className="multiples__medium-item">
              <div className="multiples__title">{item.title}</div>
              <ChartComponent {...this.props} {...item.chartProps} />
            </div>
          </div>
      )
    },


    renderItemForSmall: function(item, index) {
      return (
        <div key={index}>
          <div className="multiples__title">{item.title}</div>
          <SmallChartComponent {...this.props} {...item.chartProps} />
        </div>
      )
    },


    renderItems: function(renderer) {
      return this.props.spec.map(function(item, index) {
          return renderer(item, index);
      });
    },


    render: function() {
      return (
        <div className="multiples">
          <Hider minWidth={750}>
            <div className="row">
              {this.renderItems(this.renderItemForLarge)}
            </div>
          </Hider>
          <Hider minWidth={550} maxWidth={750}>
            <div className="row">
              {this.renderItems(this.renderItemForMedium)}
            </div>
          </Hider>
          <Hider maxWidth={550}>
              <div className="multiples__small">
                {this.renderItems(this.renderItemForSmall)}
              </div>
          </Hider>
        </div>  
      )
    }

  });

}