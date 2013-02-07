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
    env = json.parse(cookie("browser-env"));
  }
  catch (e) {
    // do nothing
  }
  return env[name];
};
