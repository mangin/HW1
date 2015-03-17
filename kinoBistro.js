(function () {
    'use strict';
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
     * @public
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
     * @param id {number}
     * @param options {object}
     * @param options.rating {number} from 0 to 10
     */
    function Movie(name, id, options) {
        options = options || {};
        this.name = name;
        this.id = id;
        this.rating = options.rating;
    }

    /**
     * @class
     * @param movieId {number}
     * @param time {Date}
     */
    function Session(movieId, time) {
        this.movieId = movieId;
        this.time = time;
    }

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
     * @public
     * @param session {Session}
     */
    Cinema.prototype.addSession = function(session) {
        this.sessions.push(session);
        return this;
    };

    //Movies and cinemas initialization
    var movies = [
        new Movie('21 табуретка', 0, {rating: 2.5}),
        new Movie('Принесенные штилем', 1, {rating: 3.2}),
        new Movie('Занудность грез', 2, {rating: 4.9}),
        new Movie('Возвращение в Кнешуош', 3, {rating: 1.6}),
        new Movie('Земной мир', 4, {rating: 3.8})
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
}());