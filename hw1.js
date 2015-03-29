/*global console*/
(function () {
    'use strict';
    function Cinema(name, position, options) {
        options = options || {};
        this.name = name;
        this.position = position;
        this.phone = options.phone;
    }

    function Position(x, y) {
        this.x = x;
        this.y = y;
    }

    function distance(position1, position2) {
        return Math.sqrt(Math.pow(position1.x - position2.x, 2) + Math.pow(position1.y - position2.y, 2));
    }

    function Film(name, rating, options) {
        options = options || {};
        this.name = name;
        this.rating = rating;
        this.description = options.description;
    }

    function Session(film, cinema, time) {
        this.film = film;
        this.cinema = cinema;
        this.time = time;
    }

    var cinemas, films, sessions, manager;
    cinemas = [1, 2, 3, 4].map(function (x) {
        return new Cinema(
            "Cinema " + x,
            new Position(x, 2 * x),
            { phone: x }
        );
    });

    films = [1, 2, 3, 4, 5].map(function (x) {
        return new Film(
            "Film " + x,
            x,
            { description: "It is film # " + x }
        );
    });

    sessions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (x) {
        return new Session(
            films[x % films.length],
            cinemas[(x * x) % cinemas.length],
            new Date(2015, 3, 20, 10 + x, 0)
        );
    });

    manager = {};
    manager.findSessionByFilmName = function (filmName) {
        return sessions.filter(function (candidate) {
            return candidate.film.name === filmName;
        });
    };

    manager.sortByUserPosition = function (userPosition, film) {
        var filmSessions = manager.findSessionByFilmName(film);
        filmSessions.sort(function (a, b) {
            var
                dist1 = distance(userPosition, a.cinema.position),
                dist2 = distance(userPosition, b.cinema.position);
            if (dist1 < dist2) {
                return -1;
            }
            if (dist1 > dist2) {
                return 1;
            }
            return 0;
        });
        return filmSessions;
    };

    console.log(manager.sortByUserPosition(new Position(1, 1), "Film 1"));
}());