function createCinema(name, location, movies, options) {
  return {
    name: name,
    location: location,
    description: options.description || "",
    movies: movies || []
  }
}

function createMovie(name, description, timetable, options) {
  return {
    name: name,
    description: {
      annotation: description.annotation || "",
      artists: description.artists || []
    },
    timetable: timetable || [],
    raiting: options.raiting || 0;
  }
}
