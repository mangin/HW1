'use strict';

var BasicQuery = require("./cinema/query").BasicQuery,
    _ = require("lodash");

function isEven(x) {
    return x % 2 === 0;
}

function has123(x) {
    return (/1|2|3/).test(x.toString());
}

function desc(x) {
    return -x;
}

function minusCmp(x, y) {
    return y - x;
}

function mod500moreThan200(x) {
    return x % 500 >= 200;
}

var normalArrayMethodsVsImprovedFilters = {
    funcA: function query() {
        return new BasicQuery(_.range(300000))
            .orderBy(desc)
            .filter(has123)
            .filter(isEven)
            .filter(mod500moreThan200)
            .top(30)
            .toArray();
    },
    funcB: function arrayMethods() {
        return _.range(300000)
            .sort(function (x, y) {
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            })
            .filter(has123)
            .filter(isEven)
            .filter(mod500moreThan200)
            .slice(0, 30);
    },
    count: 5
};

var benchmarks = [normalArrayMethodsVsImprovedFilters];

function runFunc(func, times) {
    var res, start, end, i;
    start = new Date();
    for (i = 0; i < times; i += 1) {
        res = func();
    }
    end = new Date();
    return {
        res: res,
        time: end - start
    };
}

function runBm(bm, times) {

    var bmARes = runFunc(bm.funcA, times),
        bmBRes = runFunc(bm.funcB, times);
    if (!_.isEqual(bmARes.res, bmBRes.res)) {
        console.log(bmARes);
        console.log(bmBRes);
        throw "They are not equal!";
    }
    return {
        nameA: bm.funcA.name,
        nameB: bm.funcB.name,
        timeA: bmARes.time,
        timeB: bmBRes.time
    };
}

benchmarks.forEach(function (bm) {
    var res = runBm(bm, bm.count);
    console.log(res);
});