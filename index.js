/**
 * Module dependencies
 */
var merge = require("fmerge");

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
  hook = hook || function(req, vs, next) {next(null, vs)};

  return function browserEnv(req, res, next) {
    var browser = {};
    vars.forEach(function(env) {
      if(!env) return;
      browser[env] = process.env[env];
    });

    // Merge the current cookie
    if(req.cookies) {
      var cookies;
      try {
        cookies = JSON.parse(req.cookies[options.name] || "{}");
      }
      catch (e) {
        cookies = {};
      }
      Object.keys(cookies).forEach(function(key) {
        browser[key] = cookies[key];
      });
    }

    hook(req, browser, function(err, browserVars, cookieOptions) {
      if(err) return next(err);

      if(!cookieOptions) cookieOptions = {};

      var cookie = JSON.stringify(browserVars || browser);

      // If it's the same, we don't need to set it again
      if (req.cookies && req.cookies[options.name] == cookie) return next();

      res.cookie(options.name, cookie, merge(options, cookieOptions));
      next();
    });
  };
};
