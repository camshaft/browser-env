/**
 * Module dependencies
 */

/**
 * Expose `process.env` variables to the browser
 *
 * @param {Array} vars
 * @param {Object} options
 * @param {Function} hook
 * @return {Function}
 */
module.exports = function(vars, options, hook) {
  vars = vars || (process.env.BROWSER_ENV || "").split(",");
  options = options || {maxage: 3600000};
  options.name = options.name || "browser-env";
  hook = hook || function(req, vars, next) {next()};

  return function browserEnv(req, res, next) {
    var browser = {};
    vars.forEach(function(env) {
      browser[env] = process.env[env];
    });

    hook(req, browser, function(err, browserVars) {
      if(err) return next(err);

      var cookie = JSON.stringify(browserVars || browser);

      if (req.cookies && req.cookies[options.name] === cookie) return next();

      res.cookie(options.name, cookie, options);
      next();
    });
  };
};
