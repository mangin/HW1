/*jslint node: true, vars: true, white: true, nomen: true*/
module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'test/setup.js',
            'test/*.spec.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS']
    });
};
