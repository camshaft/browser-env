/**
 * Module dependencies
 */
var express = require("express");

/**
 * Set up the env
 */
process.env.FOO = "bar";
process.env.BAZ = "foo";
// Should not show up
process.env.BAR = "baz";
process.env.BROWSER_ENV = "FOO,BAZ";

/**
 * Export the app
 */
var app = module.exports = express();

app.use(express.cookieParser());
app.use(require("..")());
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/../build"));
