/*global readline, print, console*/
/*jslint plusplus: true */

function makeCoords(x, y) {
    'use strict';
    return {x: x, y: y};
}

var User = function (a_userPositionStr, a_options) {
    'use strict';
    var crds = a_userPositionStr.split(' ').map(parseFloat);
    this.userPosition = makeCoords(crds[0], crds[1]);
    this.userOptions = a_options || {};

    // some functions working with options
};

var Cinema = function (a_cinemaName, a_cinemaLocationStr, a_cinemaCoordsStr, a_cinemaMovies, a_options) {
    'use strict';
    this.cinemaName = a_cinemaName;
    this.cinemaLocation = a_cinemaLocationStr;
    this.cinemaCoordsStr = a_cinemaCoordsStr;
    this.cinemaMovies = [];
    this.cinemaOptions = a_options || {};

    a_cinemaMovies.forEach(function (item, i) {
        this.cinemaMovies[i] = item;
    });

    this.cinemaMovieAdd = function (movie) {
        this.cinemaMovies[this.cinemaMovies.length + 1] = movie;
    };

    this.cinemaMovieGetTitle = function (movieId) {
        return this.cinemaMovies[movieId].movieGetTitle();
    };

    this.cinemaMovieGetById = function (movieId) {
        return this.cinemaMovies[movieId];
    };

    this.cinemaGetMovies = function () {
        return this.cinemaMovies;
    };

    this.cinemaGetCoords = function (cinemaCoordsStr) {
        var crds = cinemaCoordsStr.split(' ').map(parseFloat);
        return makeCoords(crds[0], crds[1]);
    };

};


var Movie = function (a_movieTitle, a_movieRating, a_movieDesc, a_movieOptions) {
    'use strict';
    this.movieTitle = a_movieTitle;
    this.movieRating = a_movieRating;
    this.movieDesc = a_movieDesc;
    this.movieOptions = a_movieOptions;

    this.movieGetTitle = function () {
        return this.movieTitle;
    };

    this.movieGetRating = function () {
        return this.movieRating;
    };

    this.movieGetDesc = function () {
        return this.movieDesc;
    };
};


function getDistance(coords1, coords2) {
    'use strict';
    return Math.sqrt((coords1.x - coords2.x) * (coords1.x - coords2.x) +
        (coords1.y - coords2.y) * (coords1.y - coords2.y));
}

var movies = [
    "Equilibrium",
    "Stalker",
    "Dead Man",
    "Gladiator",
    "Peaceful Warrior",
    "V for Vendetta",
    "Lord of War",
    "Braveheart"
].map(function (movie, index) {
    'use strict';
    return new Movie(movie, index);
});

var cinemas = [
    "Pearl",
    "Cinex",
    "Warren",
    "MovieTown",
    "Cinemark"
].map(function (name, index) {
    'use strict';
    var moviesList = [],
        i,
        movie;
    for (i = 0; i < 5; ++i) {
        movie = movies[Math.floor(Math.random() * movies.length)];
        moviesList.push(movie);
    }
    return new Cinema(name, index, moviesList);
});


var manager = function () {
    'use strict';
    this.sortByUserPosition = function (cinemas, user) {
        return cinemas.sort(function (cinema1, cinema2) {
            return getDistance(cinema1.cinemaGetCoords, user.userPosition) -
                getDistance(cinema2.cinemaGetCoords, user.userPosition);
        });
    };

    this.sortByRating = function (movies) {
        return movies.slice().sort(function (movie1, movie2) {
            return movie1.movieRating - movie2.movieRating;
        });
    };

    function logRatingTitle(cinemovie) {
        console.log(cinemovie.movieGetRating(), cinemovie.movieGetTitle());
    }

    var i,
        cinemovie;
    for (i = 0; i < cinemas.length; i++) {
        cinemovie = this.sortByRating(cinemas[i].cinemaGetMovies());
        logRatingTitle(cinemovie);
    }
};