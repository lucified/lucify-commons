
var extend = require('object-extend');

var base = {
	twitterSite: "@lucify_",
	twitterCreator: "@lucify",
	ogType: 'w',
	ogSiteName: 'Lucify',
	fbAppId: 1383541931953557
};


var apply = function(def) {
	return extend(base, def);
};

module.exports.base = base;
module.exports.apply = apply;
