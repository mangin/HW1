// Менеджер расписания
function createScheduleManager(schedule) {
    "use strict";
    var manager = {schedule: schedule};

    // Оставляет в расписании только сеансы со временем в диапазоне [from, to]
    manager.filterTime = function (from, to) {
        return this.schedule.filter(function (scheduleItem) {
            return scheduleItem.date.value >= from.value
                    && scheduleItem.date.value <= to.value;
        });
    };

    // Оставляет в расписании только сеансы в кинотеатрах, перечисленных в массиве theaters
    manager.filterTheaters = function (theaters) {
        return this.schedule.filter(function (scheduleItem) {
            return theaters.some(function (theater) {
                return scheduleItem.theater === theater;
            });
        });
    };

    // Оставляет в расписании только сеансы с фильмами, перечисленными в массиве films
    manager.filterFilms = function (films) {
        return this.schedule.filter(function (scheduleItem) {
            return films.some(function (film) {
                return scheduleItem.film === film;
            });
        });
    };

    return manager;
}


