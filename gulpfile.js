var gulp = require('gulp'),
	sass = require('gulp-sass'),
  livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
  twig = require('gulp-twig');

var data = require('./data.json');

console.log(data);

sass.compiler = require('node-sass');

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});


gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('compile', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('./index.twig')
        .pipe(twig({
            data: data
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    return gulp.src('index.js')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('copy', function () {
    gulp.src('./logo.png')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
	gulp.watch('index.twig', gulp.series('compile'));
	gulp.watch('index.js', gulp.series('js'));
});


gulp.task('connect', function() {
  connect.server({
  	name: 'Dist App',
    root: 'dist',
  	livereload: true
  });
});



gulp.task('default', gulp.parallel('sass', 'copy', 'js', 'compile', 'connect','watch'));