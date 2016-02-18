
var React = require('react');
var iFrameResize = require('./iframe-resize.jsx');


var IFrameEmbed = React.createClass({

  displayName: 'IFrameEmbed',

  propTypes: {
    src: React.PropTypes.string
  },


  componentDidMount: function() {
    // TODO: use ReactDOM once we upgrade to React 0.14
    iFrameResize({log: false}, React.findDOMNode(this.refs.iframe));
  },

  render: function() {
    return (
     <div style={{lineHeight: 0}}>
      <iframe ref="iframe" id={this.iframeId} src={this.props.src}
              width="100%" scrolling="no" frameBorder={0} />
     </div>
    );
  }

});

module.exports = IFrameEmbed;
