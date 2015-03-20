/*jslint node: true, vars: true, white: true, nomen: true*/
'use strict';
function Coords(x, y) {
  this.x = x;
  this.y = y;
  return this;
}

function sqr(x) {
  return x * x;
}

Coords.prototype.distSqr = function(that) {
  return sqr(this.x - that.x) + sqr(this.y - that.y);
};

exports.create = function(x, y) {
  return new Coords(x, y);
};
