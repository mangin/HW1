/*global describe: false, it: false, before: false, after: false*/
'use strict';

describe('cinema query', function () {
    var BaseCinemaQuery, provider, collection;
    before(function () {
        BaseCinemaQuery = require('../cinema/cinemaQuery').BaseCinemaQuery;
        provider = require('../cinema/provider');
        collection = [
            {
                id: 'cinema1',
                coords: { lat: -2, lon: 0 },
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
                coords: { lat: 20, lon: 20 },
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
                coords: { lat: -2, lon: 0 },
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
                coords: { lat: 5, lon: 10 },
                timeTable: []
            }
        ];
    });
    it('should return the collection if nothing said', function () {
        new BaseCinemaQuery(collection).toArray().should.eql(collection);
    });
    it('should sort by position', function () {
        var pos = { lat: 0, lon: 0 };
        new BaseCinemaQuery(collection)
            .orderByNearness(pos)
            .toArray()
            .map(function (c) { return c.coords; })
            .should
            .eql([{ lat: -2, lon: 0 }, { lat: -2, lon: 0 }, { lat: 5, lon: 10 }, { lat: 20, lon: 20 }]);
    });
    it('should sort by position and film soonness', function () {
        var pos = { lat: 0, lon: 0 };
        new BaseCinemaQuery(collection)
            .withFilm(1, new Date(2000, 1, 3))
            .orderByNearness(pos)
            .thenBySoonest(1, new Date(2000, 1, 3))
            .toArray()
            .map(function (c) { return c.id; })
            .should
            .eql(['cinema3', 'cinema1']);
    });
    it('should find cinema by id', function () {
        provider.cinemas.byId(3).should.eql(provider.cinemas.all().toArray()[3]);
    });

    describe('cinema provider', function () {
        it('should return cinemaQuery with cinemas.all()', function () {
            provider.cinemas.all().should.be.instanceof(BaseCinemaQuery);
        });
    });

});

describe("film query", function () {
    var BaseFilmQuery, provider;
    before(function () {
        BaseFilmQuery = require('../cinema/filmQuery').BaseFilmQuery;
        provider = require('../cinema/provider');
    });
    describe('cinema provider', function () {
        it('should return FilmQuery with films.all()', function () {
            provider.films.all().should.be.instanceof(BaseFilmQuery);
        });
        it("should search by first film's name", function () {
            var firstFilm = provider.films.all().toArray()[0];
            provider.films.all().withName(firstFilm.name).toArray().should.contain(firstFilm);
        });
    });
});