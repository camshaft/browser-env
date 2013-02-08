/**
 * Module dependencies
 */
var cookie = require("cookie")
  , json = require("json");

/**
 * Get a env variable
 */
module.exports = function(name) {
  var env = {};
  try {
    env = json.parse(cookie(module.exports.__cookie));
  }
  catch (e) {
    // do nothing
  }
  return name ? env[name] : env;
};

module.exports.__cookie = "browser-env";
