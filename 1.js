function createCinema(name, description, position, options) {
    'use strict';
    options = options || {};
    return {
        name: name,
        description: description,
        position: position,
        address: options.address,
        rating: options.rating
    };
}

function createFilm(name, description, options) {
    'use strict';
    options = options || {};
    return {
        name: name,
        description: description,
        genre: options.genre,
        rating: options.rating
    };
}

function createPosition(x, y) {
    'use strict';
    return {
        x: x,
        y: y
    };
}

function createTimeInterval(startTime, endTime) {
    'use strict';
    return {
        startTime: startTime,
        endTime: endTime
    };
}

function createSession(cinema, film, timeInterval, options) {
    'use strict';
    options = options || {};
    return {
        cinema: cinema,
        film: film,
        timeInterval: timeInterval,
        is3d: options.is3d || false
    };
}

var cinemas = [1, 2, 3].map(function (x) {
    'use strict';
    return createCinema(
        "name of cinema#" + x,
        "description of cinema#" + x,
        createPosition(x, (x + x))
    );
});

var films = [1, 2, 3, 4, 5].map(function (x) {
    'use strict';
    return createCinema(
        "name of film#" + x,
        "description of film#" + x
    );
});

var sessions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (x) {
    'use strict';
    return createSession(
        cinemas[x % cinemas.length],
        films[x % films.length],
        createTimeInterval(new Date(2015, 3, 27, x, 0, 0), new Date(2015, 3, 27, x + 2, 0, 0))
    );
});

var manager = {};

manager.initialData = {
    sessions: this.sessions
};

manager.queryIsProceed = false;

manager.holdQuery = function () {
    'use strict';
    if (this.queryIsProceed) {
        return;
    }
    this.queryIsProceed = true;
    this.responceData = {
        sessions: this.sessions
    };
    this.sessions = this.responceData.sessions;
    return this;
}

manager.unholdQuery = function () {
    'use strict';
    this.sessions = this.initialData.sessions
    this.queryIsProceed = false
    return this;
}

manager.setSessions = function (sessions) {
    'use strict';
    this.sessions = sessions;
    return this;
}

manager.findSessionsByFilmName = function (filmName) {
    'use strict';
    this.holdQuery();
    this.sessions = this.sessions.filter(function(session) {
        return session.film.name === filmName;
    });
    return this;
}

manager.sortSessionsByUserPosition = function (userPosition) {
    this.holdQuery();
    function distance(position1, position2) {
        var x1 = position1.x, y1 = position1.y, x2 = position2.x, y2 = position2.y;
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
    function sortFunction(session1, session2) {
        var session1Distance = distance(session1.cinema.position, userPosition),
            session2Distance = distance(session2.cinema.position, userPosition);
        if(session1Distance < session2Distance) {
            return -1;
        }
        if(session1Distance < session2Distance) {
            return 1;
        }
        return 0;
    }
    this.sessions = this.sessions.sort(sortFunction);
    return this;
}

manager.getSessionsTop = function(count) {
    var responce = this.sessions.slice(0, count);
    this.unholdQuery();
    return responce;
}