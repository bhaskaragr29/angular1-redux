var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    browerify = require('browserify'),
    uglify = require('gulp-uglify'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    htmlmin = require('gulp-htmlmin')
    path = require('path'),
    connect = require('gulp-connect');
    

const BOOTSTRAP_PATH = './node_modules/bootstrap-sass';
var npm = path.join('./', 'node_modules');


gulp.task('clean', function() {
    // content
    return del(['./dist']);

});

gulp.task('fonts', function() {
    return gulp.src(path.join
    (npm, 'bootstrap-sass', 'assets', 'fonts')+'/**')
        .pipe(gulp.dest('./dist/styles/fonts'));
});

const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: path.join(npm, 'bootstrap-sass', 'assets', 'stylesheets')
};

gulp.task('build-css', ['fonts'], function() {
    return gulp.src(['./app/testApp.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions))
      .pipe(size())
      .pipe(sourcemaps.write('./maps')) // write sourcemaps in seperate file
      .pipe(gulp.dest('./dist/styles'))
});

gulp.task('build-js', function() {
    // content
    browerify('./app/index.js',{debug:false})
    .transform("babelify", { presets :["es2015"]})
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload());
});


gulp.task('watch-js', function() {
    // content
    gulp.watch(['./app/**/*.js','index.js'], ['build-js'])
});

gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['build-css']);
});

gulp.task('build-templates', function() {
    // content
    return gulp.src([
        './app/views/**/*.jade',
        './app/lib/**/*.jade',
        './app/index.jade',
        './app/templates/*.jade'
    ])
    .pipe(jade({
        client: false,
        pretty: true,
        doctype: 'html'
    }))
    // .pipe(htmlmin({
    //     collapseWhitespace: true,
    //     removeComments: true
    // }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
});

gulp.task('watch-templates', function() {
    gulp.watch(['./app/index.jade','./app/templates/*.jade'], ['build-templates']);
});


gulp.task('build',['build-css','build-js','build-templates']);


gulp.task('watch',[
        'watch-js',
        'sass:watch',
        'watch-templates'
    ]);


gulp.task('serve', ['build','watch'], function() {
    connect.server({
        root: 'dist',
        livereload: true,
        'port':8080,
        'debug':true,
    })
});
