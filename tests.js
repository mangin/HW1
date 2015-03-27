console.log(
	manager
	    .setSessions(sessions)
	    .findSessionsByFilmName("name of film#1")
	    .sortSessionsByUserPosition({x:1, y:1})
	    .getSessionsTop(10)
);

console.log(
	manager
	    .sortSessionsByUserPosition({x:3, y:4})
	    .findSessionsByFilmName("name of film#3")
	    .getSessionsTop(1)
);