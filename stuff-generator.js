// Создание базы фильмов, кинотеатров и расписания
/*global createFilm, createTheater, createScheduleItem*/

var films = [
    'Дом',
    'Дивергент',
    'Барашек Шон',
    'Золушка',
    'Поклонник',
    'Энни'
].map(createFilm(name));

var theaters = [
    {name: 'Салют', x: 10, y: 80},
    {name: 'Титаник Синема', x: 32, y: 54},
    {name: 'Дом кино', x: 5, y: 18},
    {name: 'Колизей', x: 8, y: 7},
    {name: 'Космос', x: 15, y: 37},
    {name: 'Синема Парк', x: 51, y: 29}
].map(function (theater) { "use strict"; return createTheater(theater.x, theater.y, {name: theater.name}); });

var schedule = [23, 12, 34, 32, 22, 11, 95, 28, 38, 4, 89, 98, 14, 53, 39, 43, 87, 19, 40, 43, 49, 27, 53, 18].map(
    function (n) {
        "use strict";
        return createScheduleItem(
            new Date(2015, 4, 1 + (n % 2), 9 + (n % (24 - 9)), ((n + 7) % 12) * 5),
            theaters[n % theaters.length],
            films[n % films.length]
        );
    }
);
