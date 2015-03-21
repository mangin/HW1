/*global describe: false, it: false, before: false, after: false*/
'use strict';

describe('cinema query', function () {
    var Query, Coords, collection;

    before(function () {
        Query = require('../cinema/query').Query;
        Coords = require('../cinema/coords').Coords;
        collection = [
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
            }
        ];
    });

    it('should return the collection if nothing said', function () {
        new Query({collection: collection}).toArray().should.eql(collection);
    });

    it('should sort by position', function () {
        var pos = new Coords(0, 0);
        new Query({collection: collection})
            .orderByNearness(pos)
            .toArray()
            .map(function (c) { return c.coords; })
            .should
            .eql([new Coords(-2, 0), new Coords(-2, 0), new Coords(5, 10), new Coords(20, 20)]);
    });

    it('should sort by both position and film soonness', function () {
        var pos = new Coords(0, 0);
        new Query({collection: collection})
            .orderByNearness(pos)
            .orderBySoonest(1, new Date(2000, 1, 3))
            .toArray()
            .map(function (c) { return c.id; })
            .should
            .eql(['cinema3', 'cinema1', 'cinema4', 'cinema2']);
    });

});
