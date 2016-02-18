

var React = require('react');
var d3 = require('d3');


module.exports = function(Component) {

  return React.createClass({

    displayName: 'BindToSexLoopContext',

    getInitialState: function() {
      return {
        sex: 'a',
        sexSelection: 'a'};
    },


    onSexSelectionChange: function(sel) {
      if (sel != 'l') {
        clearInterval(this.interval);
      }

      if (sel == 'l') {
        this.setState({sex: 'f'});
        this.startLoop();
        this.setState({sexSelection: sel});

      } else {
        this.setState({sexSelection: sel, sex: sel});

      }
    },


    startLoop: function() {
      this.toggle();
      this.interval = setInterval(this.toggle, 1100);
    },


    toggle: function() {
      if (this.state.sex == 'f') {
        this.setState({sex: 'm'});
        return;
      }
      if (this.state.sex == 'm') {
        this.setState({sex: 'f'});
        return;
      }
    },


    render: function() {
      return <Component {...this.props} sex={this.state.sex}
        onSexSelectionChange={this.onSexSelectionChange} />;
    }

  });

};

