/*jslint devel: true, browser: true */

function main() {
    'use strict';

    var filmId = 0,
        cinemaId = 0,
        userId = 0,
        Films,
        Cinemas,
        User,
        manager = {},
        foundedCinema,
        wishedFilm;

    /* Создание фильма */
    function createFilm(name, options) {
        filmId += 1;
        options = options || {};
        return {
            id: filmId,
            name: name,
            options: options
        };
    }

    /* Создание кинотеатра */
    function createCinema(name, position, films, options) {
        cinemaId += 1;
        options = options || {};
        return {
            id: cinemaId,
            name: name,
            position: position,
            films: films,
            options: options,
            hasFilm: function (idF) {
                var film;
                for (film in films) {
                    if (films.hasOwnProperty(film) && films[film] === idF) {
                        return true;
                    }
                }
                return false;
            }
        };
    }

    /* Создание пользователя */
    function createUser(name, position, options) {
        userId += 1;
        options = options || {};
        return {
            id: userId,
            name: name,
            position: position,
            options: options
        };
    }

    /* Возвращает объект с таким именем */
    manager.getByName = function (name) {
        var element;
        for (element in this) {
            if (this.hasOwnProperty(element) && this[element].name === name) {
                return this[element];
            }
        }
    };

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
            return createFilm(name);
        });
        Films.getByName = manager.getByName;

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
            return createCinema(cinema.name, cinema.position, cinema.films);
        });
        Cinemas.getByName = manager.getByName;

        User = createUser("Ekaterina", {
            x: 56.840437,
            y: 60.616122
        });
        User.getByName = manager.getByName;
    }

    creations();

    /* Сортировка кинотеатров по близости к пользователю */
    User.sortCinemasByPosition = function () {
        var sorted = Cinemas,
            distanceA,
            distanceB;
        sorted.sort((function (user) {
            return function (a, b) {
                distanceA = Math.sqrt((a.position.x - user.position.x) * (a.position.x - user.position.x)) + (a.position.y - user.position.y) * (a.position.y - user.position.y);
                distanceB = Math.sqrt((b.position.x - user.position.x) * (b.position.x - user.position.x)) + (b.position.y - user.position.y) * (b.position.y - user.position.y);
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

    /* Возвращает ближайший к пользователю кинотеатр */
    User.getClosestCinema = function () {
        var cinema,
            closest,
            distance,
            min = Number.MAX_VALUE;
        for (cinema in Cinemas) {
            if (Cinemas.hasOwnProperty(cinema)) {
                distance = Math.sqrt((cinema.position.x - this.position.x) * (cinema.position.x - this.position.x)) + (cinema.position.y - this.position.y) * (cinema.position.y - this.position.y);
                if (distance < min) {
                    min = distance;
                    closest = cinema;
                }
            }
        }
        return closest;
    };

    /* Возвращает ближайший к пользователю кинотеатр, в котором идет фильм с таким именем */
    User.getClosestCinemaWithWishedFilm = function (name) {
        var film = Films.getByName(name),
            sortedCinemas = this.sortCinemasByPosition(),
            i;
        for (i = 0; i < sortedCinemas.length; i += 1) {
            if (sortedCinemas[i].hasFilm(film.id)) {
                return sortedCinemas[i];
            }
        }
        return false;
    };


    foundedCinema = User.getClosestCinemaWithWishedFilm(wishedFilm);
    if (foundedCinema.name) {
        document.getElementById('result').innerHTML = "If you want to see \"" + wishedFilm + "\" film, you should go to \"" + foundedCinema.name + "\" cinema.";
    } else {
        document.getElementById('result').innerHTML = "Sorry, we can't help you. You can choose another film.";
    }
}