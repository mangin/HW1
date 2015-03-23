'use strict';

var _ = require("lodash"),
    query = require("./query");

function nameFilter(name) {
    return function (film) {
        return film.name === name;
    };
}

function BaseFilmQuery() {
    query.BasicQuery.apply(this, arguments);
}
function OrdFilterFilmQuery() {
    query.OrdFilterQuery.apply(this, arguments);
}
function RangeFilmQuery() {
    query.RangeQuery.apply(this, arguments);
}

BaseFilmQuery.prototype = Object.create(query.BasicQuery.prototype);
OrdFilterFilmQuery.prototype = Object.create(query.OrdFilterQuery.prototype);
RangeFilmQuery.prototype = Object.create(query.RangeQuery.prototype);
[BaseFilmQuery, OrdFilterFilmQuery, RangeFilmQuery].forEach(function (FilmQuery) {
    FilmQuery.prototype.ctors = {
        Basic: BaseFilmQuery,
        OrdFilter: OrdFilterFilmQuery,
        Range: RangeFilmQuery
    };
    FilmQuery.prototype.withName = function (name) {
        return this.filter(nameFilter(name));
    };
});



exports.BaseFilmQuery = BaseFilmQuery;