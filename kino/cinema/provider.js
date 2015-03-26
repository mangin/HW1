'use strict';

var CinemaQuery = require("./cinemaQuery").BaseCinemaQuery,
    FilmQuery = require("./filmQuery").BaseFilmQuery,
    gen = require("random-seed").create("my best seed"),
    _ = require("lodash");
var words = require("../poem.json");

function getName() {
    var count = gen.intBetween(1, 3),
        start = gen.range(words.length - count);
    return words.slice(start, start + count).join(" ");
}

var cinemaCount = gen.intBetween(10, 20);
var filmCount = gen.intBetween(20, 30);

var cinemas = _.range(cinemaCount).map(function (i) {
    var fromDate = new Date(2015, 0, 1).getTime(),
        toDate = new Date(2015, 4, 1).getTime();
    return {
        id: i,
        name: getName(),
        coords: {
            lon: gen.floatBetween(-180, 180).toFixed(3),
            lat: gen.floatBetween(-180, 180).toFixed(3)
        },
        timeTable: _.range(20).map(function () {
            return {
                date: new Date(gen.intBetween(fromDate, toDate)),
                filmId: gen.range(filmCount)
            };
        })
    };
});

var films = _.range(filmCount).map(function (i) {
    return {
        id: i,
        name: getName()
    };
});

var cinemaIdIndex = _.indexBy(cinemas, "id");
var filmIdIndex = _.indexBy(films, "id");

exports.cinemas = {
    all: function () {
        return new CinemaQuery(cinemas);
    },
    byId: function (id) {
        return cinemaIdIndex[id];
    }
};

exports.films = {
    all: function () {
        return new FilmQuery(cinemas);
    },
    byId: function (id) {
        return filmIdIndex[id];
    }
};