'use strict';
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'browserify'],
        files: [
            'test/**/*.js'
        ],
        reporters: ['mocha'],
        preprocessors: {
            'test/**/*.js': [ 'browserify' ]
        },
        browserify: {
            debug: true,
            transform: [ 'brfs' ]
        },
        autoWatch: false,
        singleRun: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS']
    });
};
