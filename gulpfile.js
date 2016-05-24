var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');

gulp.task('css', function () {
	gulp.src('src/**/*.css')
		.pipe(concat('main.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('public/css'));
});
 
gulp.task('js', function() {
	gulp.src('src/js/main.js')
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('build', ['css', 'js']);

gulp.task('dev', ['build'], function () {
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['build']);