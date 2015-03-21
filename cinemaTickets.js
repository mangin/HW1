function createLocation(x, y) {
    'use strict';
    return { x: x, y: y };
}

function getDistance(location1, location2) {
    'use strict';
    return Math.sqrt((location1.x - location2.x) * (location1.x - location2.x) +
        (location1.y - location2.y) * (location1.y - location2.y));
}

function createUser(location, options) {
    'use strict';
    options = options || {};
    return {
        location: location,
        name: options.name || "Username",
        age: options.age || 0
    };
}

//name is string
function createFilm(name, options) {
    'use strict';
    options = options || {};
    return {
        name: name,
        minimumAge: options.minimumAge || 0
    };
}


//time in format hh:mm
//dayOfWeek in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
function getDate(dayOfWeek, time) {
    'use strict';
    var dayOfMonth = {
        'Mon': 5,
        'Tue': 6,
        'Wed': 7,
        'Thu': 1,
        'Fri': 2,
        'Sat': 3,
        'Sun': 4
    };
    return new Date(dayOfWeek + ', 0' + dayOfMonth[dayOfWeek] + ' Jan 1970 ' + time + ':00');
}

//time is a Datetime object (only hours and minutes and have a meaning)
function createSession(dayOfWeek, time, ticketCount, ticketPrice) {
    'use strict';
    return {
        date: getDate(dayOfWeek, time),
        ticketCount: ticketCount,
        ticketPrice: ticketPrice
    };
}

//sessions is an array of sessions
function createTimetable(film, sessions) {
    'use strict';
    return {
        film: film,
        sessions: sessions
    };
}

//timetables is an object array of timetables
function createCinema(name, location, timetables) {
    'use strict';
    return {
        name: name,
        location: location,
        timetables: timetables
    };
}

function laterToday(date1, date2) {
    'use strict';
    if (date1.getDay() !== date2.getDay()) {
        return false;
    }
    if (date1.getHours() < date2.getHours()) {
        return false;
    }
    if (date1.getHours() === date2.getHours() && date1.getMinutes() <= date2.getMinutes()) {
        return false;
    }
    return true;
}

function filterTodaySessions(cinemas, date) {
    'use strict';
    var i, j, newCinemas = [], cinema, newTimetables, timetable, newSessions,
        sessionFilter = function (session) {
            return laterToday(session.date, date);
        };
    for (i = 0; i < cinemas.length; i += 1) {
        cinema = cinemas[i];
        newTimetables = [];
        for (j = 0; j < cinema.timetables.length; j += 1) {
            timetable = cinema.timetables[j];
            newSessions = timetable.sessions.filter(sessionFilter);
            if (newSessions.length !== 0) {
                newTimetables.push(createTimetable(timetable.film, newSessions));
            }
        }
        if (newTimetables.length !== 0) {
            newCinemas.push(createCinema(cinema.name, cinema.location, newTimetables));
        }
    }
    return newCinemas;
}

function filterByFilmName(cinemas, name) {
    'use strict';
    var newCinemas = [], i, cinema, newTimetables,
        filmFilter = function (timetable) {
            return timetable.film.name === name;
        };
    for (i = 0; i < cinemas.length; i += 1) {
        cinema = cinemas[i];
        newTimetables = cinema.timetables.filter(filmFilter);
        if (newTimetables.length !== 0) {
            newCinemas.push(createCinema(cinema.name, cinema.location, newTimetables));
        }
    }
    return newCinemas;
}

function sortByUserLocation(cinemas, user) {
    'use strict';
    return cinemas.sort(function (cinema1, cinema2) {
        return getDistance(cinema1.location, user.location) -
            getDistance(cinema2.location, user.location);
    });
}

function getTop(cinemas, count) {
    'use strict';
    return cinemas.slice(0, count);
}

Array.prototype.filterTodaySessions = function (date) {
    'use strict';
    return filterTodaySessions(this, date);
}

Array.prototype.filterByFilmName = function (name) {
    return filterByFilmName(this, name);
}

Array.prototype.sortByUserLocation = function (user) {
    return sortByUserLocation(this, user);
}

Array.prototype.getTop = function (count) {
    return getTop(this, count);
}

function testSetUp() {
    var film1, film2, timetable1, timetable2, timetable3, timetable4, cinema1, cinema2;
    film1 = createFilm('Godzilla');
    film2 = createFilm('King-Kong');
    timetable1 = createTimetable(film1, [
        createSession('Mon', '12:00', 100, 100),
        createSession('Tue', '13:00', 100, 100)
    ]);
    timetable2 = createTimetable(film2, [
        createSession('Wed', '14:00', 100, 100),
        createSession('Thu', '15:00', 100, 100)
    ]);
    timetable3 = createTimetable(film1, [
        createSession('Fri', '16:00', 100, 100),
        createSession('Sat', '17:00', 100, 100)
    ]);
    timetable4 = createTimetable(film2, [
        createSession('Sun', '10:00', 100, 100),
        createSession('Sun', '11:00', 100, 100)
    ]);
    cinema1 = createCinema('BigCinema', createLocation(0, 0), [timetable1, timetable2]);
    cinema2 = createCinema('SmallCinema', createLocation(100, 100), [timetable3, timetable4]);
    return [cinema1, cinema2];
}

function assert(testName, statement) {
    if (statement)
        console.log(testName + ' passed.');
    else
        console.log(testName + ' failed.');
}

function test1() {
    var cinemas = testSetUp(), user;
    user = createUser(createLocation(10, 10));
    cinemas = cinemas
        .sortByUserLocation(user);
    assert('test1', cinemas[0].name === 'BigCinema');
}

function test2() {
    var cinemas = testSetUp(), cinema;
    cinemas = cinemas.filterTodaySessions(getDate('Sun', '10:30'));
    cinema = cinemas[0];
    assert('test2', cinema.timetables[0].sessions[0].date.getHours() === 11);
}

function test3() {
    var cinemas = testSetUp().filterByFilmName('Godzilla');
    assert('test3', cinemas[0].timetables.length == 1 && cinemas[1].timetables.length == 1);
}

window.onload = function() {
    'use strict';
    test1();
    test2();
    test3();
}

