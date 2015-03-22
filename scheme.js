var schema = {};

(function () {
    'use strict';
    schema.cinemas = {};
    schema.movies = {};
    schema.links = {};

    schema.createCinema = function (position, auxliary) { return { position: position, auxliary: auxliary || {}}; };
    schema.createMovie = function createMovie(name, auxliary) {return {name: name, auxliary: auxliary || {}}; };
    schema.linkMovieToCinema = function linkMovieToCinema(movieId, cinemaId, schedule) {
        schema.links[movieId] = schema.links[movieId] || {};
        schema.links[movieId][cinemaId] = schedule;
    };
}());