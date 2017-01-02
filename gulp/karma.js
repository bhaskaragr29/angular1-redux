'use strict';

const gulp = require('gulp');
const Server = require('karma').Server;
const path = require('path');
const _ = require('lodash');
const gutil = require('gulp-util');
const log = gutil.log;
const red = gutil.colors.red;

const server = (params) => {
    params = params || {};

    _.defaults(params, {
        configFile: path.join(process.cwd(), 'karma.conf.js'),
        browser: ['PhantomJS'],
        singleRun: true
    });

    return (done) => {
        return new Server(params, (error) => {
            if (error) {
                log(red(`ERROR: karma bad karma (error count: ${error})`));
                process.exit();
            }

            if (params.singleRun) {
                process.exit();
            }

            done();
        }).on('browser_error', (error) => {}).start();
    };
};

exports.unit = server();

exports.runner = server({ singleRun: false });

exports.debug = server({
    singleRun: false
    // browsers: ['Chrome']
});
