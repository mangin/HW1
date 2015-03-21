'use strict';
require("es5-shim");
var Query = require("../cinema/simpleResolver").CinemaQuery;
console.log(new Query().toArray());