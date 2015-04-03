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

    return manager;
}

//// Пример использования:
//manager = createScheduleManager(schedule);
//manager.
