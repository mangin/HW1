(function () {
    "use strict";

    function createCircle(radius, position, options) {
        options = options || {};
        return {
            radius: radius,
            position: position,
            color: options.color || "black"
        };
    }
    function createCinema(name, description, position, films, options) {
        options = options || {};
        return {
            name: name,
            position: position,
            description: description,
            films: films
        };
    }
    function createUser(nickname, position, options) {
        options = options || {};
        return {
            nickname: nickname,
            position: position
        };
    }
    function createFilm(name, description, price, time, options) {
        options = options || {};
        return {
            name: name,
            description: description,
            price: price,
            time: time
        };
    }

    var cinemas = [["Kosmos", "Kosmos decr", 56.845531, 60.604217],
        ["Park House", "Park House decr", 56.863508, 60.63082]].map(function (cinema) {
        return createCinema(cinema[0], cinema[1], {
            x: cinema[2],
            y: cinema[3]
        });
    }),
        users = [],
        manager = {};

    users.push(createUser('nikit0s', {
        x: 56.863369,
        y: 60.630084
    }));

// Не могу понять почему сортировка массива не проходит
    manager.sortByUserPosition = function (user) {
        cinemas.sort(function (a, b) {
            return (Math.sqrt((b.x - user.x) * (b.x - user.x) + (b.y - user.y) * (b.y - user.y)) - Math.sqrt((a.x - user.x) * (a.x - user.x) + (a.y - user.y) * (a.y - user.y)));
        });
    };
}());