/*jslint node: true, vars: true, white: true, nomen: true*/
'use strict';

var maxDate = new Date(-8640000000000000);

function getSoonestFilmTime(cinema, filmId, date) {
  var soonestFilmScheduleItem = cinema.timeTable.reduce(function(prevBest, item) {
    if (item.filmId !== filmId || item.date < date) {
      return prevBest;
    }
    if (!prevBest) {
      return item;
    }
    return item.date < prevBest.date ? item : prevBest;
  }, null);
  return soonestFilmScheduleItem ? soonestFilmScheduleItem.date : maxDate;
}

var nearnessOrderer = {
      coords: null,
      orderBy: function (cinema) {
        return this.coords.distSqr(cinema.coords);
      }
    },
    soonestFilmDateOrderer = {
      date: null,
      filmId: null,
      orderBy: function (cinema) {
        return getSoonestFilmTime(cinema, this.filmId, this.date);
      }
    };

function compare(aItem, bItem) {
  if (aItem < bItem) {
    return -1;
  } if (aItem > bItem) {
    return 1;
  }
  return 0;
}

function compareBy(a, b, orderers, i) {
  var cmpRes = compare(orderers[i].orderBy(a), orderers[i].orderBy(b));
  return i === orderers.length - 1 || cmpRes !== 0 ?
    cmpRes :
    compareBy(a, b, orderers, i + 1);
}

function getComparator(orderers) {
  return function(a, b) {
    return compareBy(a, b, orderers, 0);
  };
}

function cloneParams(oldParams, overrides) {
  var newParams = {};
  Object.keys(oldParams).forEach(function(key) {
    newParams[key] = overrides[key] === undefined ? oldParams[key] : overrides[key];
  });
  return newParams;
}

function CinemaQuery(queryParams) {
  var params = cloneParams({
    orderers: [],
    collection: []
  }, queryParams);

  function clone(overrides) {
    return new CinemaQuery(cloneParams(params, overrides));
  }

  this.orderByNearness = function(pos) {
    var ord = Object.create(nearnessOrderer);
    ord.coords = pos;
    return clone({ orderers: params.orderers.concat([ord]) });
  };

  this.orderBySoonest = function(filmId, date) {
    var ord = Object.create(soonestFilmDateOrderer);
    ord.date = date;
    ord.filmId = filmId;
    return clone({ orderers: params.orderers.concat([ord]) });
  };

  this.toArray = function() {
    var res = params.collection.map(function(x) { return x; });
    if (params.orderers.length > 0) {
      res.sort(getComparator(params.orderers));
    }
    return res;
  };
}

exports.CinemaQuery = CinemaQuery;
