
var React = require('react');
var OnResize = require('react-window-mixins').OnResize;


var ScrollThenFix = React.createClass({

  displayName: 'ScrollThenFix',

  mixins: [OnResize],


  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onScroll);
  },


  componentDidMount: function() {
    this.setState({
      offsetTop: this.getDOMNode().offsetTop,
      height: this.getDOMNode().getBoundingClientRect().height
    });

    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  },


  onResize: function() {
    this.updateOffsetTop();
  },

  onScroll: function() {
    this.updateOffsetTop();
  },


  updateOffsetTop: function() {
    var node = this.getDOMNode();
    if (!node) {
      return;
    }

    this.setState({
      offsetTop: node.offsetTop,
      scrollY: window.pageYOffset,
      height: React.findDOMNode(this.refs.main).getBoundingClientRect().height
    });
  },


  scrolledOverTop: function(){
    if (!this.state.offsetTop || !this.state.scrollY) {
      return false;
    }

    return this.state.scrollY > this.state.offsetTop;
  },


  getMainDivStyle: function() {
    return {
      position: this.scrolledOverTop() ? 'fixed' : 'static',
      top: '0px',
      right: '0px',
      left: '0px',
      zIndex: '200'
    };
  },


  getPlaceHolderStyle: function() {
    return {
      display: this.scrolledOverTop() ? 'block' : 'none',
      height: this.state.height
    };
  },


  render: function() {
    return (
      <div className="scroll-then-fix">
        <div ref="main" style={this.getMainDivStyle()}>
          {this.props.children}
        </div>
        <div style={this.getPlaceHolderStyle()} />
      </div>
    );
  }

});


module.exports = ScrollThenFix;
