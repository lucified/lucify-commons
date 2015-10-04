

var asset = function(id) {
  if (window.lucifyAssetManifest != null
    && window.lucifyAssetManifest[id] != null) {
    return window.lucifyAssetManifest[id];
  } 
  return id;
}

var possibleGzipPrefix = function() {
  if (window.gzipEnabled) {
    return ".gz";
  }
  return "";
}


var img = function(id) {
  return "/images/" + asset(id) + possibleGzipPrefix();
}

var data = function(id) {
  return "/data-assets/" + asset(id) + possibleGzipPrefix();
}


module.exports.img = img;
module.exports.data = data;

