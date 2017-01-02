'use strict';

var path = require('path');

module.exports = function(config) {
    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha', 'browserify'],

        // reporters
        reporters: ['mocha', 'coverage'],

        // list of files / patterns to load in the browser
        files: [
            path.join('node_modules/angular/angular.min.js'),
            path.join('node_modules/angular-mocks/angular-mocks.js'),
            './app/index.js',
            './test/**/*.js'
        ],

        preprocessors: {
            'lib/**/*.js': ['browserify'],
            'app/index.js': ['browserify'],
            './test/**/*.js': ['browserify']
        },

        browserify: {
            // spread and rest operators do not work with the versions used in here
            // let's be honest though, why would we need sourcemaps for testing stuff, right?
            // debug: true,
            transform: ['babelify']
        },

        coverageReporter: {
            dir: 'reports',
            reporters: [
                {type: 'text'},
                {type: 'lcov', subdir: 'lcov'},
                {type: 'html', subdir: 'html'},
                {type: 'cobertura', subdir: '.'}
            ]
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        captureTimeout: 20000,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-browserify'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO
    });
};