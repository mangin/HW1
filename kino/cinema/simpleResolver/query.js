/*jslint node: true, vars: true, white: true, nomen: true*/
'use strict';

function copyWithMutation(query) {
  var queryCopy = {}, k;
  for (k in query) {
    if (query.hasOwnProperty(k)) {
      queryCopy[k] = query[k];
    }
  }
  return queryCopy;
}

function orderByAsc(fieldName) {
  var that = copy(this);
  that.orderAsc = true;
  that.fieldToOrderBy = fieldName;
  return that;
}

function getTop(count) {
  var that = copy(this);
  that.from = 0;
  that.to = count;
  return that
}

function getRange()

function getInitial(collection) {
  return {
    collection: collection,
    fieldToOrderBy: null,
    orderAsc: true,
    from: 0,
    to: -1,
    orderBy: orderBy
  };
}
exports.create = function(collection) {
  return {

  }
};
