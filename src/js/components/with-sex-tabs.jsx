
var React = require('react');
var SexTabs = require('./sex-tabs.jsx');
var bindToSexLoopContext = require('./bind-to-sex-loop-context.jsx');
var Hider = require('./element-query-hider.jsx');


module.exports = function(Component, minWidth) {

  return bindToSexLoopContext(React.createClass({

    displayName: 'WithSexTabs',


    render: function() {

      if (!minWidth) {
        return (
          <div>
            <SexTabs onChange={this.props.onSexSelectionChange} />
            <Component {...this.props} sex={this.props.sex} />
          </div>
        );
      }

      return (
        <div>
          <Hider minWidth={minWidth}>
            <SexTabs onChange={this.props.onSexSelectionChange} />
          </Hider>
          <Component {...this.props} sex={this.props.sex} />
        </div>
      );
    }

  }));

};
