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
