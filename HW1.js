/*global print: false*/
var cinemaList = ["Космос", "Колизей", "Салют", "Титаник"], //Список кинотеатров
    spaceFilm = ["Дивергент", "Темный рыцарь", "Голодные игры"], //Список фильмов  в кинотеатре
    colosseum = ["Дом", "Неуловимые", "Призрак"],
    salute = ["Дивергент", "Дом", "Самба"],
    titanic = ["Робот по имени Чаппи", "Город Героев", "Виноваты звезды"];
//Хочу еще задать массив времени чтобы вычеслять точно когда будет фильм и сколько времени останется до сеанса.
//Но столько массивов создавать не вариант.

//Места в зале занятых/свободных мест
function placeFree() {
    "use strict";
    var place = [false, false, false, false, true, true, false, true], i;
    for (i = 0; i < place.length; i = i + 1) {
        if (place[i]) {
            print("Свободно - " + i);
        } else {print("Занято - " + i); }
    }
}
//Расстояние до выбранного кинотеатра
function youLocation(x1, y1) {
    "use strict";
    var x2 = 0, y2 = 0, d = 0;
    d = Math.sqrt((Math.pow(x2 - x1)) + (Math.pow(y2 - y1)));
    return d;
}
//Поиск фильма в текущем кинотеатре
function searchFilm(film, cinemaFilm) {
    "use strict";
    var i;
    for (i = 0; i < cinemaFilm.length; i = i + 1) {
        if (film === cinemaFilm[i]) {
            print("В данном кинотеатре идет этот фильм");
        } else {print("Увы, в этом кинотеатре не идет данный фильм"); }
    }
}