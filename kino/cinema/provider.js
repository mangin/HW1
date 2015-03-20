/*jslint node: true, vars: true, white: true, nomen: true*/
'use strict';
var Q = require('q');
var cinemas = [];
exports.list = function() {
  return Q.fcall(function() {
    return cinemas;
  });
};
