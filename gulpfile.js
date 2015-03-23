/**
 * Created by vyt on 2015-03-05.
 */

var gulp = require('gulp');
var using = require('gulp-using');
var sass = require('gulp-sass');
var react = require('gulp-react');

gulp.task('sass', function () {
    gulp.src('./public/stylesheets/scss/*.scss')
        .pipe(using({}))
        .pipe(sass())
        .pipe(gulp.dest('./public/stylesheets/css'))

});

gulp.task('react', function () {
    return gulp.src('./public/jsx/*.jsx')
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('./public/javascripts/'))
});


gulp.watch('./public/stylesheets/scss/*.scss', ['sass']);
gulp.watch('./public/jsx/*.jsx', ['react']);
