function createCinema(name, location, movies, options) {
  return {
    name: name,
    location: location,
    description: options.description || "",
    movies: movies || []
  };
}

function createMovie(name, description, timetable, options) {
  return {
    name: name,
    description: {
      annotation: description.annotation || "",
      artists: description.artists || []
    },
    timetable: timetable || [],
    raiting: options.raiting || 0
  };
}

var manager = {};

manager.findByMovieName = function (movies, name) {
    return movies.filter(function(movie){
      return movie.name.contains(name);
    });
}

manager.sortByRaiting = function (movies) {
    return movies.slice(0).sort(function(a,b){
      return a.raiting - b.raiting;
    });
}

manager.getWithRaitingMoreThan = function(movies, raiting){
  return movies.filter(function(movie){
    return movie.raiting >= raiting;
  });
}

Array.prototype.findByMovieName = function(name){
  return manager.findByMovieName(this, name);
};
Array.prototype.sortByRaiting = function(){
  return manager.sortByRaiting(this);
};
Array.prototype.getWithRaitingMoreThan = function(raiting){
  return manager.getWithRaitingMoreThan(this, raiting);
};


var artists = ["Tom Cruse", "scarlett Johansson", "Spike Jonze", "Joaquin Phoenix", "Amy Adams", "Olivia Wilde", "Don Jon"];

var movies = ["Kill Bill", "Sin City", "Avatar", "Death Proof", "Pink Panther"].map(function(name, index) {
  var timetable = [1, 2, 3].map(function(number) {
    return number * (index + 1) * 123 % 24 + ":" + number * (index + 1) * 321 % 60;
  });
  var selectedArtists = [];
  artists.forEach(function(artist, i) {
    if ((index + i) % 3 == 0)
      selectedArtists.push(artist);
  });
  return createMovie(name, { annotation: name, artists: selectedArtists}, timetable, {raiting: index * 23 % 10 + 1 });
});

var cinemas = ["Cinema Park", "Roliks", "Titanic"].map(function(name, index) {
  return createCinema(name, { x: index * 2, y: index * 3 + 4}, movies, {})
});
