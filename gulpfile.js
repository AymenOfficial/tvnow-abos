var gulp = require('gulp'),
	sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

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
	gulp.watch('index.html', gulp.series('html'));
	gulp.watch('index.js', gulp.series('js'));
});


gulp.task('connect', function() {
  connect.server({
  	name: 'Dist App',
    root: 'dist',
  	livereload: true
  });
});



gulp.task('default', gulp.parallel('sass', 'html', 'copy', 'js', 'connect','watch'));