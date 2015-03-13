/**
 * Класс Кинотеатра
 *
 * @this {Cinema}
 * @param {String} _name
 * @param {String} _location
 * @param {Array} _movies
 * @param {Object} options
 */
var Cinema = function(_name, _location, _movies, options) {
    var options = options || {};
    var name = _name;
    var location = _location;
    var movies = [];
    _movies.forEach(function(item, i) {
        movies[i] = item
    });

    this.getMovie = function(id) {
        return movies[id];
    };

    this.getMovies = function() {
        return movies;
    }

    this.getMoviesTitle = function() {
        return movies.map(function(movie, i) {
            return movies[i].getTitle();
        });
    }

    this.addMovie = function(movie) {
        movies[movies.length+1] = movie
    }
};

/**
 * Класс Кинозаписи
 *
 * @this {Movie}
 * @param {String} _name
 * @param {Number} _rating
 * @param {Object} options
 */
var Movie = function(_name, _rating, options) {
    var name = _name;
    var rating = _rating;
    this.getTitle = function() {
        return name;
    };

    this.getRating = function() {
        return rating;
    }
};

var manager = {};

manager.sortByRaiting = function(movies) {
    return movies.slice(0).sort(function(a, b) {
        return a.rating - b.rating
    });
}

var movies = [
    "Spartacus",
    "Lolita",
    "2001: A Space Odyssey",
    "A Clockwork Orange",
    "Barry Lyndon",
    "The Shining"
].map(function(movie, index) {
    return new Movie(movie, index);
});

var cinemas = [
    "Salut",
    "Titanic",
    "Cinema House"
].map(function(name, index) {
    var moviesList = [];
    for (var i = 0; i < 3; i++) {
        var movie = movies[Math.floor(Math.random() * movies.length)]
        moviesList.push(movie)
    }
    return new Cinema(name, index, moviesList);
});

for (var i = 0; i < cinemas.length; i++) {
    manager.sortByRaiting(cinemas[i].getMovies()).map(function(cinema, index) {
        console.log(index, cinema.getRating(), cinema.getTitle())
    });
}
