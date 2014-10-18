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

console.log(movies.findByMovieName("a").getWithRaitingMoreThan(5).sortByRaiting());
