function createMovie (name, actors, about, options) {
	options = options || {};
	return {
		name: name,
		actors: actors,
		about: about,
		rating: options.rating || 0
	};
}

function createCinema (name, timetable, location, options) {
	options = options ||  {};
	return {
		name: name,
		timetable: timetable,
		location: location,
		options: options
	};
}

function createUser (name, location) {
	return {
		name: name,
		location: location
	};
}

var manager = {};

manager.filterCinemasByMovie = function (cinemas, movie) {
	return cinemas.filter(function (cinema) {
		return cinema.timetable.some(function (session) {
			if (session.movie.name === movie.name) {
				return true;
			}
			return false;
		});
	});
}

manager.filterMoviesByRating = function (movies, rating) {
	return movies.filter(function (movie) {
		return movie.rating >= rating;
	});
}

manager.sortCinemasByLocation = function (cinemas, location) {
	var map =  cinemas.map(function (cinema, i) {
		return {
			index: i,
			value: Math.sqrt(Math.pow(cinema.location.x - location.x, 2) + Math.pow(cinema.location.y - location.y, 2))
		};
	});
	map.sort (function (a, b) {
		return a.value - b.value;
	})
	return 	map.map(function (cinema) {
		return cinemas[cinema.index];
	});
}

manager.filterByMovieName = function (movies, name) {
	return movies.filter(function (movie) {
		return movie.name.toLowerCase().includes(name.toLowerCase());
	});
}

function baseCreation () {
	var actors = ['Jude Low', 'Kameron Diaz', 'Brus Willes', 'Will Smith', 'Robert Douny jr.',
				  'Johny Dep', 'Vin Dizel', 'Jason Stathem', 'Dwane Johnson', 'Arnold Shwarzneger',
				  'Kianu Rivz', 'Silvestr Stalone', 'Michel Rodrigez'];

	function randActors (actors) {
		var newActors = [];
		for (var i = 0; i < 4; i++) {
			newActors.push(actors[Math.floor(Math.random() * actors.length)]);
		}
		return newActors;
	}

	var movies = ['Chappie', 'Focus', 'Duxless 2',
				  'Green Planet', 'Zolushka', 'Mezhdu delom', 'Forsazh 7', 'Proklyatie'].map(function (name) {
		return createMovie(name, randActors(actors),'about movie', {rating: Math.random() * 10});
	});

	function randTimetables (movies) {
		var timetable = [];
		for (var i = 0; i < 5; i += 1) {
			timetable.push({hour: (12 + i * 2).toString(), minute: '00', movie: movies[Math.floor(Math.random() * movies.length)]});
		}
		return timetable;
	}

	var cinemas = ['Koskos', 'Kolizey', 'Salut', 'Titanic Cinema', 'Rolics', 'Premier Zal'].map(function (name) {
		return createCinema(name, randTimetables(movies), {x: Math.random() * 100, y: Math.random() * 100});
	});

	var user = createUser('Stanislav', {x: Math.random() * 100, y: Math.random() * 100});
}

base creation();
