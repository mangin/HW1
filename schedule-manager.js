// Менеджер расписания
function createScheduleManager(schedule) {
    "use strict";
    var manager = {schedule: schedule};

    // Оставляет в расписании только сеансы со временем в диапазоне [from, to]
    // Возвращает менеджера с изменённым расписанием
    manager.filterTime = function (from, to) {
        schedule = schedule.filter(function (scheduleItem) {
            return scheduleItem.date.value >= from.value
                    && scheduleItem.date.value <= to.value;
        });
        return this;
    };

    // Оставляет в расписании только сеансы в кинотеатрах, перечисленных в массиве theaters
    // Возвращает менеджера с изменённым расписанием
    manager.filterTheaters = function (theaters) {
        schedule = schedule.filter(function (scheduleItem) {
            return theaters.some(function (theater) {
                return scheduleItem.theater === theater;
            });
        });
        return this;
    };

    // Оставляет в расписании только сеансы с фильмами, перечисленными в массиве films
    // Возвращает менеджера с изменённым расписанием
    manager.filterFilms = function (films) {
        schedule = schedule.filter(function (scheduleItem) {
            return films.some(function (film) {
                return scheduleItem.film === film;
            });
        });
        return this;
    };

    manager.sortByTime = function () {
        schedule = schedule.sort(function (a, b) {
            return a.date.value - b.date.value;
        });
        return this;
    };

    manager.sortByDistance = function (x, y) {
        schedule = schedule.sort(function (a, b) {
            return Math.pow((Math.pow((x - a.theater.x), 2) + Math.pow(y - a.theater.y)), 0.5) -
                Math.pow((Math.pow((x - b.theater.x), 2) + Math.pow(y - b.theater.y)), 0.5);
        });
        return this;
    };

    return manager;
}

// Пример использования:
/*global schedule, films, theaters*/
var filteredSchedule =
    createScheduleManager(schedule)
    .filterFilms([films[0], films[2]])
    .filterTheaters([theaters[1]])
    .filterTime(Date(0), Date(2014, 4, 3))
    .schedule;
