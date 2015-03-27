function CreateMovie(name, actors, about, options) {
    'use strict';
    this.options = options || {};
    this.name = name;
    this.actors = actors;
    this.about = about;
    this.rating = options.rating || 0;
}

function CreateCinema(name, timetable, location, options) {
    'use strict';
    this.options = options ||  {};
    this.name = name;
    this.timetable = timetable;
    this.location = location;
}

function CreateUser(name, location) {
    'use strict';
    this.name = name;
    this.location = location;
}

function Base() {
    'use strict';

    function randActors(actors) {
        var newActors = [],
            i = 0;
        for (i = 0; i < 4; i += 1) {
            newActors.push(actors[Math.floor(Math.random() * actors.length)]);
        }
        return newActors;
    }

    function randTimetables(movies) {
        var timetable = [],
            i = 0;
        for (i = 0; i < 5; i += 1) {
            timetable.push({hour: (12 + i * 2).toString(), minute: '00', movie: movies[Math.floor(Math.random() * movies.length)]});
        }
        return timetable;
    }

    var actors = ['Jude Low', 'Kameron Diaz', 'Brus Willes', 'Will Smith', 'Robert Douny jr.',
            'Johny Dep', 'Vin Dizel', 'Jason Stathem', 'Dwane Johnson', 'Arnold Shwarzneger',
            'Kianu Rivz', 'Silvestr Stalone', 'Michel Rodrigez'],

        movies = ['Chappie', 'Focus', 'Duxless 2',
                'Green Planet', 'Zolushka', 'Mezhdu delom', 'Forsazh 7', 'Proklyatie'].map(function (name) {
                return new CreateMovie(name, randActors(actors), 'about movie', {rating: Math.random() * 10});
            }),

        cinemas = ['Kosmos', 'Kolizey', 'Salut', 'Titanic Cinema', 'Rolics', 'Premier Zal'].map(function (name) {
                return new CreateCinema(name, randTimetables(movies), {x: Math.random() * 100, y: Math.random() * 100});
            }),

        user = new CreateUser('Stanislav', {x: Math.random() * 100, y: Math.random() * 100});

    this.movies = movies;
    this.cinemas = cinemas;
    this.user = user;
    
    this.filterByMovieName = function (movies, name) {
        'use strict';
        return movies.filter(function (movie) {
            return movie.name.toLowerCase().includes(name.toLowerCase());
        });
    };

    this.filterMoviesByRating = function (movies, rating) {
        'use strict';
        return movies.filter(function (movie) {
            return movie.rating >= rating;
        });
    };

    this.filterCinemasByMovie = function (cinemas, movie) {
        'use strict';
        return cinemas.filter(function (cinema) {
            return cinema.timetable.some(function (session) {
                if (session.movie.name === movie.name) {
                    return true;
                }
                return false;
            });
        });
    };

    this.sortCinemasByLocation = function (cinemas, location) {
        'use strict';
        var map =  cinemas.map(function (cinema, i) {
            return {
                index: i,
                value: Math.sqrt(Math.pow(cinema.location.x - location.x, 2) + Math.pow(cinema.location.y - location.y, 2))
            };
        });
        map.sort(function (a, b) {
            return a.value - b.value;
        });
        return map.map(function (cinema) {
            return cinemas[cinema.index];
        });
    };
}