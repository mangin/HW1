/*global console, manager */

function init() {
    'use strict';
    console.log(manager.findByFilmName("Film N3").sortByUserPosition({x: 0, y: 0}).getTop(3).toString());
    console.log(manager.findByFilmName("Film N3").sortByUserPosition({x: 1000, y: 1000}).getTop(3).toString());
    console.log(manager.findByFilmName("Film N15").sortByUserPosition({x: 0, y: 0}).getTop(3).toString());
}

init();