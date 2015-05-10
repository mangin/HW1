/*global schema, manager */

(function () {
    'use strict';
    function makeTestDb() {
        var i;
        for (i = 0; i < 20; i = i + 1) {
            schema.cinemas[i] = schema.createCinema({x: Math.floor(Math.random() * (1000)), y: Math.floor(Math.random() * (1000))});
        }

        for (i = 0; i < 20; i = i + 1) {
            schema.movies[i] = schema.createMovie("Film N" + i);
            schema.linkMovieToCinema(i, i);
            schema.linkMovieToCinema(i, Math.floor(Math.random() * (20)));
            schema.linkMovieToCinema(i, Math.floor(Math.random() * (20)));
            schema.linkMovieToCinema(i, Math.floor(Math.random() * (20)));
            schema.linkMovieToCinema(i, Math.floor(Math.random() * (20)));
        }
    }

    makeTestDb();
}());
