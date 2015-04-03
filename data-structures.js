// -----------------
// Структуры данных
// -----------------

// Создает Фильм - объект со строковым полем name. При неудаче null.
function createFilm(name, info) {
    "use strict";
    var film;

    if (typeof name !== 'string') {
        return null;
    }
    if (typeof info === 'object') {
        film = info;
    }

    film.name = name;
    return film;
}

// Создаёт Кинотеатр - объект с полем location, содержащем координаты x и y. При неудаче null.
function createTheater(x, y, info) {
    "use strict";
    var location, theater;

    if (typeof x !== 'number' || typeof y !== 'number') {
        return null;
    }
    if (typeof info === 'object') {
        theater = info;
    }

    location = {x: x, y: y};
    theater.location = location;
    return theater;
}

// Создаёт запись в расписании кинотеатра: когда, где, и какой фмльм. При неудаче null.
function createScheduleItem(date, theater, film) {
    "use strict";

    if (typeof date.getMonth !== 'function'
            || typeof theater.location !== 'object'
            || typeof film.name !== 'string') {
        return null;
    }

    return {date: date, theater: theater, film: film};
}
