
var d3 = require('d3');

var accounting = require('accounting');
var url = require('url');
var deepcopy = require('deepcopy');

var queryString = require('query-string');
//var detectMobileBrowser = require('detect-mobile-browser');

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


var getEnvironment = function() {
  var parsed = url.parse(window.location);
  if (parsed.host.indexOf('localhost') != -1) {
    return 'local';
  }

  if (parsed.host.indexOf('www.lucify.com') != -1) {
    return 'prod';
  }

  return "staging";  
}


var getEmbedBaseUrl = function() {
  var parsed = url.parse(window.location.href);
  return parsed.protocol + "//" + parsed.host + "/embed/";
}


var isSlowDevice = function() {
  // mobile devices are slow
  if (isMobile.any()) {
    return true;
  }

  // ie 10 is slow
  var ieVer = detectIE();
  if (ieVer != false && ieVer < 11) {
    return true;
  }

  return false;
}


// from http://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie/21712356#21712356
var detectIE = function() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
     // IE 12 => return version number
     return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}



// get delay based on visibility settings
// for preceding elements
var getDelay = function() {
  var ret = 0;
  for (var i = 0; i < arguments.length; i++) {
    var intVal = arguments[i] ? 1 : 0;
    ret += intVal;
  };

  return ret * 500;

  // reduce does not work for the arguments object
  // var trueCount = arguments.reduce(function(curr, arg) {      
  //   return curr + intVal; 
  // }, 0);
}


function decimalPlaces(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}


var formatMoneyToPrecision = function(amount, precision) {
  var value = Number(amount.toPrecision(precision));

  return (
    <span style={{whiteSpace: "nowrap"}}>
      {accounting.formatMoney(value, "", decimalPlaces(value), " ", ",") + " "}
    </span>
  );
}


var formatMoney = function(amount, decimals) {
  //if (!decimals) {
  //  decimals = 2;
  //}

  return (
    <span style={{whiteSpace: "nowrap"}}>
      {accounting.formatMoney(amount, "", decimals, " ", ",") + " "}
    </span>
  );
}


var formatEuro = function(amount, decimals) {
  return (
    <span style={{whiteSpace: "nowrap"}}>
      {formatMoney(amount, decimals)}
      {' '}
      &euro;
    </span>
  )
}


var removeTrailingSlash = function(path) {
  var p = path + "";
  return p.replace(/\/$/, "");
}



var log = function(payload) {
  var copy = deepcopy(payload);
  copy._href = location.href;
  copy._referrer = document.referrer;  

  var url = 'https://tm-prod.appspot.com/api/log?' + queryString.stringify(copy);
  d3.xhr(url)
    .post(null, function(error, response) {
      // console.log("here");
    });
}



module.exports.log = log;
module.exports.removeTrailingSlash = removeTrailingSlash;
module.exports.detectIE = detectIE;
module.exports.getEmbedBaseUrl = getEmbedBaseUrl;
module.exports.isSlowDevice = isSlowDevice;
module.exports.getDelay = getDelay;
module.exports.formatMoney = formatMoney;
module.exports.formatEuro = formatEuro;
module.exports.formatMoneyToPrecision = formatMoneyToPrecision;
