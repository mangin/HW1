(function () {
    'use strict';

    var userLocation = new Location(0, 0);

    //Classes
    /**
     * @class
     * @param x {number} from -1000 to 1000
     * @param y {number} from -1000 to 1000
     */
    function Location(x, y) {
        if (x === undefined || x === null)
            throw new Error('Coordinate x is undefined or null');
        if (y === undefined || y === null)
            throw new Error('Coordinate y is undefined or null');
        this.x = x;
        this.y = y;
    }
    
    /**
     * @param otherLocation {Location}
     */
    Location.prototype.getDistance = function(otherLocation) {
        var xDiff = this.x - otherLocation.x,
            yDiff = this.y - otherLocation.y;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    };

    /**
     * @class
     * @param name {string}
     * @param options {object}
     * @param options.rating {number} from 0 to 10
     */
    function Movie(name, options) {
        options = options || {};
        this.name = name;
        this.rating = options.rating;
    }

    /**
     * @class
     * @param movieId {number}
     * @param time {Date}
     * @param [cinemaId] {number}
     */
    function Session(movieId, time, cinemaId) {
        this.movieId = movieId;
        this.time = time;
        if (cinemaId !== undefined)
            this.cinemaId = cinemaId;
    }

    Session.prototype.toString = function() {
        return 'Сеанс "' +
            movies[this.movieId].name +
            '" ' +this.time.toLocaleTimeString() +
            '" в "' + cinemas[this.cinemaId].name + '" (' +
            Math.floor(cinemas[this.cinemaId].distanceToUser) + 'м)';
    };

    /**
     * @class
     * @param name {string}
     * @param location {Location}
     * @param options {object}
     * @param options.rating {number} from 0 to 10
     * @param options.sessions {Session[]}
     */
    function Cinema(name, location, options) {
        this.name = name;
        this.location = location;
        this.rating = options.rating;
        this.sessions = options.sessions;
    }

    /**
     * @param session {Session}
     */
    Cinema.prototype.addSession = function(session) {
        this.sessions.push(session);
        return this;
    };

    //Movies and cinemas initialization
    var movies = [
        new Movie('21 табуретка', {rating: 2.5}),
        new Movie('Принесенные штилем', {rating: 3.2}),
        new Movie('Занудность грез', {rating: 4.9}),
        new Movie('Возвращение в Кнешуош', {rating: 1.6}),
        new Movie('Земной мир', {rating: 3.8})
    ];

    var now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        date = now.getDate();

    var cinemas = [
        new Cinema('Киномини', new Location(50, 100), {
            rating: 4.6,
            sessions: [
                new Session(0, new Date(year, month, date, 10, 20)),
                new Session(0, new Date(year, month, date, 12, 50)),
                new Session(0, new Date(year, month, date, 13, 0)),
                new Session(0, new Date(year, month, date, 15, 50)),
                new Session(0, new Date(year, month, date, 16, 20)),
                new Session(0, new Date(year, month, date, 17, 35)),
                new Session(0, new Date(year, month, date, 19, 0)),
                new Session(0, new Date(year, month, date, 20, 30)),
                new Session(0, new Date(year, month, date, 22, 10)),
                new Session(0, new Date(year, month, date, 22, 10)),
                new Session(1, new Date(year, month, date, 10, 40)),
                new Session(1, new Date(year, month, date, 12, 50)),
                new Session(1, new Date(year, month, date, 14, 0)),
                new Session(1, new Date(year, month, date, 16, 0)),
                new Session(1, new Date(year, month, date, 19, 10)),
                new Session(1, new Date(year, month, date, 21, 20)),
                new Session(2, new Date(year, month, date, 11, 0)),
                new Session(2, new Date(year, month, date, 14, 20)),
                new Session(2, new Date(year, month, date, 18, 0)),
                new Session(2, new Date(year, month, date, 20, 10)),
                new Session(3, new Date(year, month, date, 12, 0)),
                new Session(3, new Date(year, month, date, 14, 10)),
                new Session(3, new Date(year, month, date, 16, 20)),
                new Session(3, new Date(year, month, date, 19, 45)),
                new Session(3, new Date(year, month, date, 21, 10)),
                new Session(4, new Date(year, month, date, 12, 0)),
                new Session(4, new Date(year, month, date, 14, 50)),
                new Session(4, new Date(year, month, date, 19, 20)),
                new Session(4, new Date(year, month, date, 22, 20))
            ]
        }),
        new Cinema('Фейрверк', new Location(350, -190), {
            rating: 3.3,
            sessions: [
                new Session(0, new Date(year, month, date, 9, 15)),
                new Session(0, new Date(year, month, date, 13, 10)),
                new Session(0, new Date(year, month, date, 14, 20)),
                new Session(0, new Date(year, month, date, 16, 0)),
                new Session(0, new Date(year, month, date, 18, 45)),
                new Session(0, new Date(year, month, date, 20, 0)),
                new Session(0, new Date(year, month, date, 21, 10)),
                new Session(0, new Date(year, month, date, 22, 30)),
                new Session(1, new Date(year, month, date, 9, 0)),
                new Session(1, new Date(year, month, date, 11, 10)),
                new Session(1, new Date(year, month, date, 12, 30)),
                new Session(1, new Date(year, month, date, 13, 20)),
                new Session(1, new Date(year, month, date, 15, 10)),
                new Session(1, new Date(year, month, date, 16, 50)),
                new Session(1, new Date(year, month, date, 18, 10)),
                new Session(1, new Date(year, month, date, 20, 40)),
                new Session(1, new Date(year, month, date, 22, 0)),
                new Session(2, new Date(year, month, date, 12, 20)),
                new Session(2, new Date(year, month, date, 14, 40)),
                new Session(2, new Date(year, month, date, 17, 0)),
                new Session(2, new Date(year, month, date, 19, 15)),
                new Session(2, new Date(year, month, date, 21, 30)),
                new Session(3, new Date(year, month, date, 12, 0)),
                new Session(3, new Date(year, month, date, 15, 0)),
                new Session(3, new Date(year, month, date, 18, 20))
            ]
        }),
        new Cinema('Вселенная', new Location(-415, 875), {
            rating: 3.6,
            sessions: [
                new Session(0, new Date(year, month, date, 11, 20)),
                new Session(0, new Date(year, month, date, 13, 45)),
                new Session(0, new Date(year, month, date, 14, 45)),
                new Session(0, new Date(year, month, date, 17, 0)),
                new Session(0, new Date(year, month, date, 20, 10)),
                new Session(1, new Date(year, month, date, 9, 15)),
                new Session(1, new Date(year, month, date, 10, 40)),
                new Session(1, new Date(year, month, date, 11, 50)),
                new Session(1, new Date(year, month, date, 12, 55)),
                new Session(1, new Date(year, month, date, 14, 25)),
                new Session(1, new Date(year, month, date, 15, 30)),
                new Session(1, new Date(year, month, date, 17, 0)),
                new Session(1, new Date(year, month, date, 18, 30)),
                new Session(1, new Date(year, month, date, 20, 15)),
                new Session(1, new Date(year, month, date, 21, 10)),
                new Session(1, new Date(year, month, date, 22, 30)),
                new Session(2, new Date(year, month, date, 11, 20)),
                new Session(2, new Date(year, month, date, 13, 15)),
                new Session(2, new Date(year, month, date, 14, 40)),
                new Session(2, new Date(year, month, date, 15, 0)),
                new Session(2, new Date(year, month, date, 16, 40)),
                new Session(2, new Date(year, month, date, 17, 50)),
                new Session(2, new Date(year, month, date, 19, 0)),
                new Session(2, new Date(year, month, date, 20, 40)),
                new Session(2, new Date(year, month, date, 21, 30)),
                new Session(3, new Date(year, month, date, 12, 30)),
                new Session(3, new Date(year, month, date, 17, 0)),
                new Session(4, new Date(year, month, date, 9, 40)),
                new Session(4, new Date(year, month, date, 11, 10)),
                new Session(4, new Date(year, month, date, 12, 30)),
                new Session(4, new Date(year, month, date, 14, 15)),
                new Session(4, new Date(year, month, date, 15, 10)),
                new Session(4, new Date(year, month, date, 16, 50)),
                new Session(4, new Date(year, month, date, 18, 0)),
                new Session(4, new Date(year, month, date, 19, 10)),
                new Session(4, new Date(year, month, date, 20, 20)),
                new Session(4, new Date(year, month, date, 21, 30)),
                new Session(4, new Date(year, month, date, 22, 20))
            ]
        })
    ];

    cinemas.forEach(function(cinema, index) {
        cinema.sessions.forEach(function(session) {
            session.cinemaId = index;
        });

        cinema.distanceToUser = cinema.location.getDistance(userLocation);
    });

    //========================Manager=======================
    /**
     * @class
     */
    var Manager = function() {
        this.cinemas = cinemas;
        this.movies = movies;
    };

    /**
     * Filters by field name
     * @param fieldName {string}
     * @param fieldValue {*}
     */
    Manager.prototype.filterBy = function(fieldName, fieldValue) {
        return this.movies.filter(function(movie) {return movie[fieldName] === fieldValue; });
    };

    /**
     * Returns only values that are inside an interval
     * @param fieldName {string}
     * @param startValue {number}
     * @param endValue {number}
     */
    Manager.prototype.filterByInterval = function(fieldName, startValue, endValue) {
        return this.movies.filter(function(movie) {return startValue <= movie[fieldName] && movie[fieldName] <= endValue; });
    };

    /**
     * @private
     * Returns all sessions in all cinemas for one movie
     * @param movieId {number}
     * @returns {SessionCollection}
     */
    Manager.prototype.getSessionsForMovieId = function(movieId) {
        var collection = new SessionCollection();
        this.cinemas.forEach(function(cinema, index) {
            cinema.sessions.forEach(function(session) {
                if (session.movieId === movieId) {
                    collection.push(session);
                }
            });
        });
        return collection;
    };

    /**
     * @private
     * @param name {string}
     */
    function movieNameToId(name) {
        var id = -1;
        movies.every(function(movie, index) {
            if (movie.name === name) {
                id = index;
                return false;
            }
            return true;
        });
        return id;
    }

    /**
     * @private
     * @param name {string}
     */
    function cinemaNameToId(name) {
        var id = -1;
        cinemas.every(function(cinema, index) {
            if (cinema.name === name) {
                id = index;
                return false;
            }
            return true;
        });
        return id;
    }

    /**
     * @public
     * Returns all sessions in all cinemas for one movie
     * @param name {string}
     * @returns {SessionCollection}
     */
    Manager.prototype.getSessionsForMovie = function(name) {
        return this.getSessionsForMovieId(movieNameToId(name));
    };

    //=====================SessionsCollection====================
    /**
     * @class
     * @extends Array
     */
    var SessionCollection = function() {
        Array.call(this, arguments);
    };
    SessionCollection.prototype = Object.create(Array.prototype);
    SessionCollection.prototype.constructor = SessionCollection;

    /**
     * @private
     * @param fieldName {string}
     * @param fieldValue {*}
     */
    SessionCollection.prototype.filterBy = function(fieldName, fieldValue) {
        return this.filter(function(session) {return session[fieldName] === fieldValue; });
    };

    /**
     * @public
     * @param name {string}
     */
    SessionCollection.prototype.filterByMovie = function(name) {
        return this.filterBy('movieId', movieNameToId(name));
    };

    /**
     * @public
     * @param name {string}
     */
    SessionCollection.prototype.filterByCinema = function(name) {
        return this.filterBy('cinemaId', cinemaNameToId(name));
    };

    /**
     * @public
     */
    SessionCollection.prototype.sortByUserPosition = function() {
        return this.sort(function(a, b) {
            var dist1 = cinemas[a.cinemaId].distanceToUser,
                dist2 = cinemas[b.cinemaId].distanceToUser;
            if (dist1 < dist2)
                return -1;
            if (dist1 > dist2)
                return 1;
            return 0;
        });
    };

    /**
     * @public
     * @param n {number}
     */
    SessionCollection.prototype.getTop = function(n) {
        return this.slice(0, n);
    };


    var manager = new Manager();
    var collection = manager.getSessionsForMovie('Занудность грез').sortByUserPosition().getTop(10);

    collection.forEach(function(session) {console.log(session.toString());});
}());