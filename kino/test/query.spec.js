/*global describe: false, it: false, before: false, after: false*/
'use strict';

var _ = require("lodash");

describe('query', function () {
    var query, BasicQuery, arr;

    function getA(item) { return item.a; }
    function getB(item) { return item.b; }
    function sumDivisibleBy3(item) { return (item.a + item.b) % 3 === 0; }
    function someIs2(item) { return item.a === 2 || item.b === 2; }
    before(function () {
        query = require("../cinema/query");
        BasicQuery = query.BasicQuery;
        arr = [
            {a: 1, b: 2},
            {a: 3, b: 3},
            {a: 2, b: 1},
            {a: 2, b: 2}
        ];
    });
    describe('BasicQuery', function () {
        it('should return the given array', function () {
            new BasicQuery(arr).toArray().should.eql(arr);
        });
        it('should not allow mutation', function () {
            new BasicQuery(arr).allowsArrayMutation.should.eql(false);
        });
    });
    describe('RangeQuery', function () {
        it('should return slice of the given array', function () {
            new BasicQuery(arr).take(1, 3).toArray().should.eql(arr.slice(1));
        });
        it('should allow mutation', function () {
            new BasicQuery(arr).take(1, 3).allowsArrayMutation.should.eql(true);
        });
        it('should not mutate original array on mutation', function () {
            new BasicQuery(arr).take(1, 3).toArray().push("foo");
            arr.length.should.eql(4);
        });
    });
    describe('OrdFilterQuery', function () {
        it('should order array', function () {
            new BasicQuery(arr).orderBy(getA).toArray().map(getA).should.eql([1, 2, 2, 3]);
        });
        it('should order and suborder array', function () {
            new BasicQuery(arr)
                .orderBy(getB)
                .thenBy(getA)
                .toArray()
                .should.eql([arr[2], arr[0], arr[3], arr[1]]);
        });
        it('should filter array', function () {
            new BasicQuery(arr)
                .filter(sumDivisibleBy3)
                .toArray()
                .should.eql([arr[0], arr[1], arr[2]]);
        });
        it('should order and filter array', function () {
            new BasicQuery(arr)
                .orderBy(getB)
                .thenBy(getA)
                .filter(someIs2)
                .toArray()
                .should.eql([arr[2], arr[0], arr[3]]);
        });
        it('should allow mutation', function () {
            new BasicQuery(arr).orderBy(getA).allowsArrayMutation.should.eql(true);
        });
        it('should not mutate original array on mutation', function () {
            new BasicQuery(arr).orderBy(getA).toArray().push("foo");
            arr.length.should.eql(4);
        });
    });
});