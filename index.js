/**
 * Module dependencies
 */

/**
 * Expose `process.env` variables to the browser
 *
 * @param {Array} vars
 * @param {Object} options
 * @return {Function}
 */
module.exports = function(vars, options) {
  vars = vars || (process.env.BROWSER_ENV || "").split(",");
  options = options || {maxage: 3600000};

  options.name = options.name || "browser-env";

  return function browserEnv(req, res, next) {
    var browser = {};
    vars.forEach(function(env) {
      browser[env] = process.env[env];
    });
    var cookie = JSON.stringify(browser);

    if (req.cookies && req.cookies[options.name] === cookie) return next();

    res.cookie(options.name, cookie, options);
    next();
  };
};
