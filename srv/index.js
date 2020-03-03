// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
require = require("esm")(module /*, options*/);
require("dotenv").config();
module.exports = require("./main.js");
