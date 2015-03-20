/*jslint node: true, vars: true, white: true, nomen: true*/
'use strict';
var Query = require("./cinema/simpleResolver/").CinemaQuery,
    Coords = require("./cinema/coords").Coords;
var i;
var d = new Date();
for (i = 0; i < 100000; i+=1) {
new Query({ collection: [
  {
    id: 'cinema1',
    coords: new Coords(-2, 0),
    timeTable: [
      {
        date: new Date(2000, 1, 5),
        filmId: 1
      },
      {
        date: new Date(2000, 1, 1),
        filmId: 1
      }
    ]
  },
  {
    id: 'cinema2',
    coords: new Coords(20, 20),
    timeTable: [
      {
        date: new Date(2000, 1, 1),
        filmId: 2
      },
      {
        date: new Date(2000, 1, 1),
        filmId: 2
      },
      {
        date: new Date(2000, 1, 1),
        filmId: 3
      },
      {
        date: new Date(2000, 1, 1),
        filmId: 4
      }
    ]
  },
  {
    id: 'cinema3',
    coords: new Coords(-2, 0),
    timeTable: [
      {
        date: new Date(2000, 1, 2),
        filmId: 1
      },
      {
        date: new Date(2000, 1, 1),
        filmId: 2
      },
      {
        date: new Date(2000, 1, 4),
        filmId: 1
      }
    ]
  },
  {
    id: 'cinema4',
    coords: new Coords(5, 10),
    timeTable: []
  },
]}).orderByNearness(new Coords(0,0))
.orderBySoonest(1, new Date(2000, 1, 3))
.toArray();
}
d -= new Date();
console.log(d);
