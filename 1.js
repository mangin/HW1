/*global console, document*/
(function () {
    'use strict';
    function Cinema(name, position) {
        this.name = name;
        this.position = position;
        this.id = guid();
        this.shedule = [];
    }

    function Film(name, genres, duration) {
        this.name = name;
        this.genres = genres;
        this.duration = duration;
        this.id = guid();
    }

    function Session(film, datetime, cinema, price) {
        this.film = film;
        this.datetime = datetime;
        this.cinema = cinema;
        this.price = price;
        this.id = guid();
    }

    function point(x, y) {
        var p = {};
        p.x = x;
        p.y = y;
        return p;
    }

    var films = [],
        cinemas = [],
        sessions = [];

    cinemas.push(new Cinema('salut', point(10, 10)));
    cinemas.push(new Cinema('kolizey', point(54, 7)));
    cinemas.push(new Cinema('kinodom', point(7, 25)));
    cinemas.push(new Cinema('titanic', point(8, 15)));
    cinemas.push(new Cinema('karo', point(20, 40)));

    console.log('cinemas');
    cinemas.forEach(function (el) {
        console.log(el);
    });
    films.push(new Film('Transformers7', ['action'], 123));
    films.push(new Film('Star Wars', ['action', 'fantastic'], 130));
    films.push(new Film('Titanic', ['drama'], 194));
    films.push(new Film('Terminator', ['action', 'thriller'], 95));
    films.push(new Film('Alien', ['fantastic', 'thriller', 'drama'], 100));

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    (function () {
        var currentDate = new Date(),
            date = new Date(),
            hour = currentDate.getHours(),
            i;
        for (i = 0; i < 20; i = i + 1) {
            date.setTime(currentDate.getTime());
            date.setHours(getRandom(hour, 72));
            //console.log(date);
            sessions.push(new Session(films[getRandom(0, films.length - 1)], date, cinemas[getRandom(0, cinemas.length - 1)], getRandom(150, 330)));
        }

    }());

    console.log('sessions');
    sessions.forEach(
        function (el) {
            console.log(el);
        }
    );

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function Manager(sessions) {
        this.msessions = sessions;
        return this;
    }

    function sortByDatetime(session1, session2) {
        if (session1.datetime > session2.datetime) {
            return 1;
        }
        if (session1.datetime < session2.datetime) {
            return -1;
        }
        return 0;
    }
    Manager.prototype.findByFilmName = function (filmName) {
        if (filmName === '' || filmName === undefined) {
            return this;
        }
        this.msessions = this.msessions.filter(
            function (session) {
                return (session.film.name.toLowerCase() === filmName.toLowerCase());
            }
        );
        return this;
    };

    Manager.prototype.findByCinema = function (cinema) {
        if (cinema === '' || cinema === undefined) {
            return this;
        }
        this.msessions = this.msessions.filter(
            function (session) {
                return (session.cinema.name.toLowerCase() === cinema.toLowerCase());
            }
        );
        return this;
    };

    Manager.prototype.sortByDistance = function (UserLocation) {
        function distance(cinemaPosition, UserLocation) {
            return Math.sqrt(Math.pow(cinemaPosition.x - UserLocation.x, 2) + Math.pow(cinemaPosition.y - UserLocation.y, 2));
        }
        this.msessions = this.msessions.sort(function (session1, session2) {
            if (distance(session1.cinema.position, UserLocation) > distance(session2.cinema.position, UserLocation)) {
                return 1;
            }
            if (distance(session1.cinema.position, UserLocation) < distance(session2.cinema.position, UserLocation)) {
                return -1;
            }
            return 0;
        });
        return this;
    };

    Manager.prototype.sortByTime = function () {
        this.msessions = this.msessions.sort(sortByDatetime);
        return this;
    };

    Manager.prototype.toArray = function () {
        return this.msessions;
    };

    Manager.prototype.all = function () {
        return this.toArray();
    };

    var btnSearch = document.getElementById("search"),
        user = point(10, 10);
    btnSearch.onclick = search;
    document.getElementById("inFilmName").onkeydown = function (e) {
        if (e.keyCode === 13) {
            search();
        }
    };
    document.getElementById("inCinemaName").onkeydown = function (e) {
        if (e.keyCode === 13) {
            search();
        }
    };
    function search() {
        var inputFilmName = document.getElementById("inFilmName"),
            inputCinemaName = document.getElementById("inCinemaName"),
            results,
            div,
            i,
            session,
            p;
        results = (new Manager(sessions))
                .findByFilmName(inputFilmName.value)
                .findByCinema(inputCinemaName.value)
                .sortByTime()
                .sortByDistance(user)
                .toArray();
        console.log(inputFilmName.value);
        console.log(results);
        div = document.getElementById("results");
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        for (i = 0; i < results.length; i = i + 1) {
            session = results[i];
            if (session) {
                console.log(session.film.name);
                p = document.createElement("p");
                p.textContent = session.film.name + " | " + session.cinema.name + " | " + format_date(session.datetime);
                div.appendChild(p);
            }
        }
    }

    function format_date(date) {
        var time = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        return time + ' ' + ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
    }

}());