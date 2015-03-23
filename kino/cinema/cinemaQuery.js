'use strict';

var _ = require("lodash"),
    query = require("./query"),
    dist = require('geo-distance-safe');
var maxDate = new Date(-8640000000000000);

function getSoonestFilmTime(cinema, filmId, date) {
    var soonestFilmScheduleItem = cinema.timeTable.reduce(function (prevBest, item) {
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

function nearnessOrderer(coords) {
    return function (cinema) {
        return dist.between(coords, cinema.coords);
    };
}

function soonestFilmDateOrderer(filmId, date) {
    return function (cinema) {
        return getSoonestFilmTime(cinema, filmId, date);
    };
}

function BaseCinemaQuery() {
    query.BasicQuery.apply(this, arguments);
}
function OrdFilterCinemaQuery() {
    query.OrdFilterQuery.apply(this, arguments);
}
function RangeCinemaQuery() {
    query.RangeQuery.apply(this, arguments);
}

BaseCinemaQuery.prototype = Object.create(query.BasicQuery.prototype);
OrdFilterCinemaQuery.prototype = Object.create(query.OrdFilterQuery.prototype);
RangeCinemaQuery.prototype = Object.create(query.RangeQuery.prototype);
[BaseCinemaQuery, OrdFilterCinemaQuery, RangeCinemaQuery].forEach(function (CinemaQuery) {
    CinemaQuery.prototype.ctors = {
        Basic: BaseCinemaQuery,
        OrdFilter: OrdFilterCinemaQuery,
        Range: RangeCinemaQuery
    };
    CinemaQuery.prototype.withFilm = function (filmId, date) {
        return this.filter(function (cinema) {
            return cinema.timeTable.some(function (entry) {
                return entry.filmId === filmId && entry.date >= date;
            });
        });
    };
    CinemaQuery.prototype.orderByNearness = function (pos) {
        return this.orderBy(nearnessOrderer(pos));
    };
    CinemaQuery.prototype.thenByNearness = function (pos) {
        return this.thenBy(nearnessOrderer(pos));
    };
    CinemaQuery.prototype.orderBySoonest = function (filmId, date) {
        return this.orderBy(soonestFilmDateOrderer(filmId, date));
    };
    CinemaQuery.prototype.thenBySoonest = function (filmId, date) {
        return this.thenBy(soonestFilmDateOrderer(filmId, date));
    };
});



exports.BaseCinemaQuery = BaseCinemaQuery;