(function () {
    'use strict';
    var cinemas, films, manager;
    //functions
    function createCinema(name, address, films, options) {
        options = options || {};
        return {
            name: name,
            address: address,
            films: films
        };
    }

    function createFilm(name, time, price, options) {
        options = options || {};
        return {
            name: name,
            time: time,
            price: price
        };
    }

    function createUser(coordinate, options) {
        options = options || {};
        return {
            coordinate: coordinate
        };
    }

    //base
    films = [1, 2, 3, 4, 5, 6, 7].map(function (name, time) {
        return createFilm(name, time, Math.random());
    });

    cinemas = ['Roliks', 'Salut', 'TitanicCinama'].map(function (name, address) {
        var filmsList, i, film;
        filmsList = [];
        for (i = 0; i < 3; i = i + 1) {
            film = films[Math.floor(Math.random() * (films.lenght + 1))];
            filmsList.push(film);
        }
        return createCinema(name, address, films);
    });

    //Manager
    manager = {};
    manager.findByFilmName = function (film) {
        var i, j;
        for (i = 0; i < cinemas.lenght; i = i + 1) {
            for (j = 0; j < cinemas[i].films.lenght; j = j + 1) {
                if (cinemas[i].films[j].name === film) {
                    return cinemas[i];
                }
            }
        }
    }());