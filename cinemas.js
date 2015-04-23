/*jslint devel: true, browser: true */

function main() {
    'use strict';

    Array.prototype.getByName = function (name) {
        var element;

        if (this === null) {
            throw new TypeError('Array.prototype.getByName called on null or undefined');
        }

        for (element in this) {
            if (this.hasOwnProperty(element) && this[element].name === name) {
                return this[element];
            }
        }
    };

    var filmId = 0,
        cinemaId = 0,
        userId = 0,
        Films,
        Cinemas,
        Users,
        foundedCinema,
        wishedFilm;

    /* Создание фильма */
    function Film(name, options) {
        filmId += 1;
        this.id = filmId;
        this.name = name;
        this.options = options || {};
    }

    /* Создание кинотеатра */
    function Cinema(name, position, films, options) {
        cinemaId += 1;
        this.id = cinemaId;
        this.name = name;
        this.position = position;
        this.films = films;
        this.options = options || {};
        this.hasFilm = function (filmId) {
            return this.films.some(function (element) {
                return element === filmId;
            });
        };
    }

    /* Создание пользователя */
    function User(name, position, options) {
        userId += 1;
        options = options || {};
        this.id = userId;
        this.name = name;
        this.position = position;
        this.options = options || {};
    }

    /* Наполнение базы */
    function creations() {
        var inputs = document.getElementsByName("films"),
            helps = [],
            i;
        for (i = 0; i < inputs.length; i += 1) {
            helps[i] = inputs[i].value.replace(/_/g, ' ');
            if (inputs[i].checked) {
                wishedFilm = helps[i];
            }
        }
        Films = helps.map(function (name) {
            return new Film(name);
        });

        helps = [
            {
                name: 'Salut',
                position: {
                    x: 56.838348,
                    y: 60.609829
                },
                films: [
                    Films.getByName("Focus").id,
                    Films.getByName("Chappie").id,
                    Films.getByName("Cinderella").id
                ]
            },
            {
                name: 'Kolizey',
                position: {
                    x: 56.839416,
                    y: 60.610988
                },
                films: [
                    Films.getByName("Focus").id,
                    Films.getByName("Big Eyes").id,
                    Films.getByName("Cinderella").id,
                    Films.getByName("The Theory of Everything").id
                ]
            },
            {
                name: 'Roliks',
                position: {
                    x: 56.829626,
                    y: 60.672362
                },
                films: [
                    Films.getByName("Focus").id,
                    Films.getByName("Chappie").id,
                    Films.getByName("Cinderella").id,
                    Films.getByName("The Book of Life").id,
                    Films.getByName("The Theory of Everything").id
                ]
            }
        ];
        Cinemas = helps.map(function (cinema) {
            return new Cinema(cinema.name, cinema.position, cinema.films);
        });

        Users = new User("Ekaterina", {
            x: 56.840437,
            y: 60.616122
        });
    }

    creations();

    /* Сортировка кинотеатров по близости к пользователю */
    Users.sortCinemasByPosition = function () {
        var sorted = Cinemas,
            xA,
            yA,
            xB,
            yB,
            distanceA,
            distanceB;
        sorted.sort((function (user) {
            return function (a, b) {
                xA = a.position.x - user.position.x;
                yA = a.position.y - user.position.y;
                xB = b.position.x - user.position.x;
                yB = b.position.y - user.position.y;
                distanceA = Math.sqrt(xA * xA + yA * yA);
                distanceB = Math.sqrt(xB * xB + yB * yB);
                if (distanceA < distanceB) {
                    return -1;
                }
                if (distanceA > distanceB) {
                    return 1;
                }
                return 0;
            };
        }(this)));
        return sorted;
    };

    /* Возвращает ближайший к пользователю кинотеатр, в котором идет фильм с таким именем */
    Users.getClosestCinemaWithWishedFilm = function (name) {
        var film = Films.getByName(name),
            sortedCinemas = this.sortCinemasByPosition(),
            filteredCinemas = sortedCinemas.filter(function (element) {
                return element.hasFilm(film.id);
            });
        if (filteredCinemas.length > 0) {
            return filteredCinemas[0];
        }
        return false;
    };


    foundedCinema = Users.getClosestCinemaWithWishedFilm(wishedFilm);
    if (foundedCinema.name) {
        document.getElementById('result').innerHTML = "If you want to see \"" + wishedFilm + "\" film, you should go to \"" + foundedCinema.name + "\" cinema.";
    } else {
        document.getElementById('result').innerHTML = "Sorry, we can't help you. You can choose another film.";
    }
}