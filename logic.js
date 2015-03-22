/*global schema,math */

var manager = {};

(function () {
    'use strict';
    var filter = {};

    function CinemasForMovie(movieId, cinemaSchedules) {
        this.movieId = movieId;
        this.cinemaSchedules = cinemaSchedules;
    }

    CinemasForMovie.prototype = filter;

    manager.findByFilmName = function (movieName) {
        var movieId, key, i = 0, cinemaSchedules = [], result;
        for (key in schema.movies) {
            if (schema.movies.hasOwnProperty(key)) {
                if (schema.movies[key].name === movieName) {
                    movieId = key;
                }
            }
        }
        if (!movieId) {
            throw "Film not found";
        }
        for (key in schema.links[movieId]) {
            if (schema.links[movieId].hasOwnProperty(key)) {
                cinemaSchedules[i] = {cinemaId: key,  schedule: schema.links[movieId][key]};
                i = i + 1;
            }
        }
        result = new CinemasForMovie(movieId, cinemaSchedules);
        return result;
    };

    function getSquaredModule(x1, x2, y1, y2) {
        return Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
    }

    filter.sortByUserPosition = function (userPosition) {
        return new CinemasForMovie(this.movieId, this.cinemaSchedules.sort(
            function (a, b) {
                var aModule = getSquaredModule(userPosition.x, schema.cinemas[a.cinemaId].position.x, userPosition.y, schema.cinemas[a.cinemaId].position.y),
                    bModule = getSquaredModule(userPosition.x, schema.cinemas[b.cinemaId].position.x, userPosition.y, schema.cinemas[b.cinemaId].position.y);
                if (aModule < bModule) {
                    return -1;
                }
                if (aModule > bModule) {
                    return 1;
                }
                return 0;
            }
        ));
    };

    filter.getTop = function (count) {
        return new CinemasForMovie(this.movieId, this.cinemaSchedules.slice(0, count));
    };

    filter.toString = function () {
        var result = schema.movies[this.movieId].name,
            i,
            cinemaSchedule,
            cinemaId;
        for (i = 0; i < this.cinemaSchedules.length; i = i + 1) {
            cinemaSchedule = this.cinemaSchedules[i];
            cinemaId = cinemaSchedule.cinemaId;
            result += "\r\nCinemaId: " + cinemaId + ", position x:" + schema.cinemas[cinemaId].position.x + " y:" + schema.cinemas[cinemaId].position.y + ", schedule: " + cinemaSchedule.schedule;
        }
        return result;
    };
}());
