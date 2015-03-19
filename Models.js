
//Модель кинотеатра. Конструктор принимает объект с 
//названием кинотеатра, его координатами и т.д.
function createCinema (spec) {
    var that = {};
    
    that.time_table = schedule();
    
    that.get_name = function () {
        return spec.name || "Без имени";
    };
    
    that.location = function () {
        var position = [];
        position.push(spec.X);
        position.push(spec.Y);
        return position;
    };
    
    that.distance = function (user) {
        var Lx, Ly;
        Lx = spec.X - user.X;
        Ly = spec.Y - user.Y;
        return Math.sqrt(Lx*Lx+Ly*Ly);
    };
    
    return that;
}

//Модель фильма. Каждый фильм имеет рейтинг, описание и название
function film (spec) {
    var that = {};
    
    that.title = function () {
        return spec.title;
    };
    
    that.rating = function () {
        return spec.rating || 0;
    };
    
    that.desc = function () {
        return spec.desc || "Описнаие отсутствует";
    };
    
    return that;
}

//Сущность, позволяющая создать расписание фильмов в кинотеатре  
function schedule () {
    var that = {};
    
    that.show = [];
    
    that.addNewFilm = function (film_param) {
        var f = film(film_param);
        that.show.push({
            film : f,
            time : film_param.time,
            hall : film_param.hall
        });
        return that;
    };
    
    return that;
} 

//Создаем 5 кинотеатров
var cinemas = [1, 2, 3, 4, 5].map(function (x){
    return createCinema({
        name : "Cinema"+x,
        X : x*2,
        Y : x*3
    });
});

//Заполняем кинотеатры расписанием
(function () {
    var i,
        j,
        max = cinemas.length,
        getRandomInt = function getRandomInt(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
    //Создаем по 3 фильма каждому кинотеатру
    for (i = 0; i < max; i += 1){
        for (j = 0; j < 3; j += 1){
            cinemas[i].time_table.addNewFilm({
                title: "Film"+getRandomInt(1, 100),
                rating : getRandomInt(1, 100),
                //Возможно, здесь стоит создать не одно время, а все возможные
                //времена показа
                time : new Date(2015, getRandomInt(0, 11), getRandomInt(1, 30)),
                hall : i 
            });
        }
    }
}());

//Нечто, что ищет филльмы по заданному критерию
function search (){
    var that = {}, result = [];
    
    that.findByName = function (name){
        var i, j, number_cinemas = cinemas.length,
            number_shows;
        for (i = 0; i < number_cinemas; i += 1){
            number_shows = cinemas[i].time_table.show.length;
            for (j = 0; j < number_shows; j += 1){
                if(cinemas[i].time_table.show[j].film.title() === name){
                    result.push(cinemas[i]);
                }
            }
        }
        return that;
    };
    
    that.getResult = function () {
        return result.length === 0 ? "Такой фильм не показывают" : result[0].get_name();
    };
    return that;
}

//Создаем на странице список: фильм из сеанса - кинотеатр
for (var i = 0; i < cinemas.length; i += 1){
    document.writeln(cinemas[i].get_name() + "<br>");
    for (var j = 0; j < cinemas[i].time_table.show.length; j += 1){
        document.writeln("&emsp;&bull;" + cinemas[i].time_table.show[j].film.title() + "<br>");
    }
    document.writeln("<br>");
}
document.writeln("<br>");

//Объявляем поиск...
var s = search();
//... по фильму "Film15" и получаем название кинотеатра
//На самом деле можем вытащить все что угодно - время сеанса, координаты
//кинотеатра, но пока реализовал только это...
document.writeln(s.findByName("Film15").getResult());

