
var React = require('react');
var Tabs = require('react-simpletabs');


module.exports = React.createClass({

  displayName: 'SexTabs',

  propTypes: {
    onChange: React.PropTypes.func
  },


  getInitialState: function() {
    return {
      index: 1
    };
  },

  onChange: function(index) {
    this.setState({index: index});
    if (this.props.onChange) {
      //console.log(this.getPos(index));
      this.props.onChange(this.getPos(index));
    }
  },


  getPos: function(index) {
    switch (index) {
      case 1: return 'a';
      case 2: return 'f';
      case 3: return 'm';
      case 4: return 'l';
    }
    return 'a';
  },


  render: function() {

    var style = {
        backgroundColor: "transparent",
        borderBottom: "1px solid transparent",
        maxHeight: 12
    };

    var tabStyle = {
      color: "black",
      textAlign: "left",
      height: 24
    };

    return (
        <div className="sex-tabs">
          <div>
              <Tabs onAfterChange={this.onChange} tabActive={this.state.index}>
                <Tabs.Panel title="Kaikki"><div /></Tabs.Panel>
                <Tabs.Panel title="Naiset"><div /></Tabs.Panel>
                <Tabs.Panel title="Miehet"><div /></Tabs.Panel>
                <Tabs.Panel title="Looppi"><div /></Tabs.Panel>
              </Tabs>
          </div>
        </div>
    );
  }


});
