/*global schema,math */

var manager = {};

(function () {
    'use strict';
    var filter;

    function CinemasForMovie(movieId, cinemaSchedules) {
        this.movieId = movieId;
        this.cinemaSchedules = cinemaSchedules;
    }

    filter = CinemasForMovie.prototype;

    manager.findByFilmName = function (movieName) {
        var movieId, key, i = 0, cinemaSchedules = [], result;
        for (key in Object.keys(schema.movies)) {
            if (schema.movies[key].name === movieName) {
                movieId = key;
            }
        }
        if (!movieId) {
            return null;
        }
        for (key in Object.keys(schema.links[movieId])) {
            cinemaSchedules[i] = {cinemaId: key, schedule: schema.links[movieId][key]};
            i = i + 1;
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
                var x = userPosition.x,
                    y = userPosition.y,
                    li = schema.cinemas,
                    aModule = getSquaredModule(x, li[a.cinemaId].position.x, y, li[a.cinemaId].position.y),
                    bModule = getSquaredModule(x, li[b.cinemaId].position.x, y, li[b.cinemaId].position.y);
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
        var result = schema.movies[this.movieId].name + '\r\n',
            mapped = this.cinemaSchedules.map(function (cinemaSchedule) {
                var cinemaId = cinemaSchedule.cinemaId;
                return "CinemaId: " + cinemaId + ", position x:" + schema.cinemas[cinemaId].position.x + " y:" + schema.cinemas[cinemaId].position.y + ", schedule: " + cinemaSchedule.schedule;
            });
        result += mapped.join('\r\n');       
        return result;
    };
}());
