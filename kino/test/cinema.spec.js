/*jslint node: true, vars: true, white: true, nomen: true*/
/*global describe: false, it: false, before: false, after: false*/
'use strict';
describe('cinemas', function() {

  var cinemaProvider = null;

  before(function() {
    cinemaProvider = require('../cinema/provider');
  });

  it('provider should have list method', function() {
    cinemaProvider.should.have.property('list');
  });

  it('list should return a promise with length', function() {
    cinemaProvider.list().should.eventually.have.property('length');
  });


});
