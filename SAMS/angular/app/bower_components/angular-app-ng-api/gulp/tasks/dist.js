'use strict';

var rename      = require('gulp-rename');
var filesize    = require('gulp-filesize');
var ngmin       = require('gulp-ngmin');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var gulp        = require('gulp');
var moduleName  = 'basic-vplex-sizer-app-ng-api.js';

gulp.task('dist', ['clean'], function () {
    return gulp.src([
        'src/js/module.js',
        'src/js/**.js'
    ])
    .pipe(concat(moduleName))
    .pipe(filesize())
    .pipe(gulp.dest('dist'))
    .pipe(ngmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(filesize())
    .pipe(gulp.dest('dist'));
});  