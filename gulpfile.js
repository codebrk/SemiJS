
'use strict';

const gulp     = require('gulp');
const rename   = require('gulp-rename');
const concat   = require('gulp-concat');
const minify   = require('gulp-uglify');
const maps     = require('gulp-sourcemaps');
const babel    = require('gulp-babel');


gulp.task("concatJs", function() {
    return gulp.src([
        "src/semijs.js",
        "src/plugin.js",
        "src/methods.js",
    ])
    .pipe(babel({
		presets: ['env']
    }))
    .pipe(maps.init())
    .pipe(concat("semijs.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("dist"));
});

gulp.task("minifyJs", function() {
    return gulp.src(["dist/semijs.js"])
    .pipe(minify())
    .pipe(rename("semijs.min.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["concatJs"], function () {
    gulp.start("minifyJs");
});

gulp.task("watch", function() {
    gulp.watch(["./src/*.js", "./src/**/*.js"], ["concatJs"]);
});