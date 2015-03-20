/*jslint node: true, vars: true, white: true, nomen: true*/
'use strict';

function getComparator(extract) {
  return function (a, b) {
    var aItem = extract(a),
        bItem = extract(b);
    if (aItem < bItem) {
      return -1;
    } if (aItem > bItem) {
      return 1;
    }
    return 0;
  };
}

var AsIsOrderer = function() { return this; };
AsIsOrderer.prototype.order = function(collection) {
  return collection;
};

var NearnessOrderer = function(coords) {
  this.coords = coords;
  return this;
};

NearnessOrderer.prototype.order = function(collection) {
  return collection.slice(0).sort(getComparator(function(x) {
    return x.
  }));
};

var CinemaQuery = function(orderByDate, from, to, ) { return this; };
CinemaQuery.prototype.clone() {

};
