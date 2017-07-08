'use strict';

// dependencies
var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag = require('gulp-tag-version');

// config
var paths = {
    scripts       : ['src/*.js'],
    versionToBump : ['./package.json'],
    versionToCheck: 'package.json',
    destination          : './'
};

/**
 * Bumping version number.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch           # makes v0.1.0 → v0.1.1
 *     gulp minor           # makes v0.1.1 → v0.2.0
 *     gulp major           # makes v0.2.1 → v1.0.0
 *     gulp prerelease      # makes v0.0.1-2 → v0.0.1-3
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */
function inc(importance) {

    gulp.src(paths.versionToBump) // get all the files to bump version in
        .pipe(bump({type: importance})) // bump the version number in those files
        .pipe(gulp.dest(paths.destination))  // save it back to filesystem
        .pipe(git.commit('bumps package version')) // commit the changed version number
        .pipe(filter(paths.versionToCheck)) // read only one file to get the version number
        .pipe(tag()) // tag it in the repository
        .pipe(git.push('origin', 'master', { args: '--tags' })); // push the tags to master
}

// Register tasks
gulp.task('patch', function() { return inc('patch'); });
gulp.task('minor', function() { return inc('minor'); });
gulp.task('major', function() { return inc('major'); });
gulp.task('prerelease', function() { return inc('prerelease'); });