'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
   return gulp.src('styles/scss/**/*.scss')
       .pipe(sourcemaps.init())     
       .pipe(sass({outputStyle : 'expanded'}).on('error', sass.logError))
       .pipe(autoprefixer())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('styles/css/'))

       .pipe(sourcemaps.init())
       .pipe(minCss())
       .pipe(rename({ extname: '.min.css' }))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('styles/css/'))

});

gulp.watch('styles/scss/**/*.*', gulp.series('default'));