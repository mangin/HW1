'use strict';

function compare(aItem, bItem) {
    if (aItem < bItem) { return -1; }
    if (aItem > bItem) { return 1; }
    return 0;
}

function compareBy(a, b, orderers, i) {
    var cmpRes = compare(orderers[i](a), orderers[i](b));
    return i === orderers.length - 1 || cmpRes !== 0
        ? cmpRes
        : compareBy(a, b, orderers, i + 1);
}

function getComparator(orderers) {
    return function (a, b) {
        return compareBy(a, b, orderers, 0);
    };
}

function filter(array, filters) {
    return array.filter(function (item) {
        return filters.every(function (filter) { return filter(item); });
    });
}

function BasicQuery(arr) {
    this.arr = arr;
}

function OrdFilterQuery(filters, orderers, parent) {
    this.filters = filters;
    this.orderers = orderers;
    this.parent = parent;
    if (!this.filters.length && !this.orderers.length) {
        throw "Both filters and orderers can't be empty";
    }
}

function RangeQuery(from, count, parent) {
    this.from = from;
    this.count = count;
    this.parent = parent;
}

BasicQuery.prototype.filter = function (filter) {
    return new this.ctors.OrdFilter([filter], [], this);
};
BasicQuery.prototype.orderBy = function (orderer) {
    return new this.ctors.OrdFilter([], [orderer], this);
};
BasicQuery.prototype.take = function (from, count) {
    return new this.ctors.Range(from, count, this);
};
BasicQuery.prototype.top = function (count) {
    return this.take(0, count);
};
BasicQuery.prototype.toArray = function () {
    return this.arr;
};
BasicQuery.prototype.ctors = {
    Basic: BasicQuery,
    Range: RangeQuery,
    OrdFilter: OrdFilterQuery
};
BasicQuery.prototype.allowsArrayMutation = false;


RangeQuery.prototype = Object.create(BasicQuery.prototype.ctors.Basic.prototype);
RangeQuery.prototype.toArray = function () {
    return this.parent.toArray().slice(this.from, this.from + this.count);
};
RangeQuery.prototype.take = function (from, count) {
    return new this.ctors.Range(this.from + from, Math.max(this.count, count));
};
RangeQuery.prototype.allowsArrayMutation = true;


OrdFilterQuery.prototype = Object.create(BasicQuery.prototype.ctors.Basic.prototype);
OrdFilterQuery.prototype.filter = function (filter) {
    return new this.ctors.OrdFilter(this.filters.concat(filter), this.orderers, this.parent);
};
OrdFilterQuery.prototype.orderBy = function (orderer) {
    if (this.orderers.length) {
        throw "Pointless to reorder twice in a row. Use thenBy to do a complex ordering";
    }
    return new this.ctors.OrdFilter(this.filters, [orderer], this.parent);
};
OrdFilterQuery.prototype.thenBy = function (orderer) {
    if (!this.orderers.length) {
        throw "Never was ordered, so can't add complex orderer. Use orderBy to begin with";
    }
    return new this.ctors.OrdFilter(this.filters, this.orderers.concat(orderer), this.parent);
};
OrdFilterQuery.prototype.toArray = function () {
    var parentArray = this.parent.toArray();
    if (!this.orderers.length) {
        return filter(parentArray, this.filters);
    }
    if (this.filters.length) {
        return filter(parentArray, this.filters).sort(getComparator(this.orderers));
    }
    return this.parent.allowsArrayMutation
        ? parentArray.sort(getComparator(this.orderers))
        : parentArray.slice(0).sort(getComparator(this.orderers));
};
OrdFilterQuery.prototype.allowsArrayMutation = true;

module.exports.BasicQuery = BasicQuery;
module.exports.OrdFilterQuery = OrdFilterQuery;
module.exports.RangeQuery = RangeQuery;
