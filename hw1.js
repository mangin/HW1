function createCinema(name, position, options) {
    'use strict';
    options = options || {};
    return {
        name: name,
        position: position,
        phone: options.phone
    };
}

function createPosition(x, y) {
    'use strict';
    return {
        x: x,
        y: y
    };
}

function createFilm(name, rating, options) {
    'use strict';
    options = options || {};
    return {
        name: name,
        rating: rating,
        description: options.description || " "
    };
}

function createSession(film, cinema, time) {
    'use strict';
    return {
        film: film,
        cinema: cinema,
        time: time
    };
}

var cinemas = [1, 2, 3, 4].map(function (x) {
    'use strict';
    return createCinema(
        "Cinema " + x,
        createPosition(x, 2 * x),
        { phone: x }
    );
});

var films = [1, 2, 3, 4, 5].map(function (x) {
    'use strict';
    return createFilm(
        "Film " + x,
        x,
        { description: "It is film # " + x }
    );
});

var sessions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (x) {
    'use strict';
    return createSession(
        films[x % films.length],
        cinemas[(x * x) % cinemas.length],
        new Date(2015, 3, 20, 10 + x, 0)
    );
});

var manager = {};
manager.findSessionByFilmName = function (filmName) {
    return sessions.filter(function(candidate) {
        return candidate.film.name == filmName;
    });
}

function distance(position1, position2) {
    return Math.sqrt(Math.pow(position1.x - position2.x, 2) + Math.pow(position1.y - position2.y, 2));
}

manager.sortByUserPosition = function (userPosition, film) {
    var sessions = manager.findSessionByFilmName(film);
    sessions.sort(function(a, b) {
        var dist1 = distance(userPosition, a.cinema.position);
        var dist2 = distance(userPosition, b.cinema.position);
        if (dist1 < dist2)
            return -1;
        if (dist1 > dist2)
            return 1;
        return 0;
    })
    return sessions;
}