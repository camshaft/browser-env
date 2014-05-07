browser-env
===========

Share process.env variables with the browser

DEPRECATED
----------

This is no longer recommended. Use [envs](https://github.com/camshaft/envs) instead.

What?
-----

No. I'm not dumping the whole thing down. Here's how it goes.

Set your env vars with `BROWSER_ENV` as a list of comma separated variables you want to share

```sh
API_ROOT=https://api.example.com
OTHER_API=https://api.other.com
MY_SECRET=12345
BROWSER_ENV=API_ROOT,OTHER_API
```

Now in the browser you can access those:

```js
var env = require("browser-env");
console.log(env("API_ROOT"));
// https://api.example.com
console.log(env("MY_SECRET"));
// undefined
```

Usage
-----

Just add the middleware:

```js
/**
 * Module dependencies
 */
var express = require("express")
  , env = require("browser-env");

/**
 * Expose the app
 */
var app = module.exports = express();

app.use(env());
app.get("/", function(req, res){
  res.render("index");
});
```

On the client side you can either install the `component` version or use the standalone in the `build` folder.

### Component

```sh
$ component install CamShaft/browser-env
```

```js
var env = require("browser-env");

console.log(env());
```

### Standalone

```js
console.log(window.env());
```
