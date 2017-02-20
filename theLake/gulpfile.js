'use strict';

var gulp = require('gulp'),
	cache = require('gulp-cache'),
	stream = require('event-stream'),
	size = require('gulp-size'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

gulp.task('lint', function() {
    return gulp.src(['js/*.js', '!js/main.js', '!js/*.min.js', '!js/*jquery*', '!js/*bootstrap*', ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('styles', function() {
    return gulp.src(['styles/scss/*bootstrap*', 'styles/scss/*.scss'])

        
        .pipe(sourcemaps.init())     
        .pipe(sass({outputStyle : 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
    	.pipe(concat('styles.min.css'))
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./styles/css'))
});

gulp.task('scripts', function() {
    var js = gulp.src(['js/*.js', '!js/*jquery*', '!js/*bootstrap*', '!js/*slick*'])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(size({
        	title: 'size of custom js'
        }))
        .pipe(gulp.dest('js/'));
    var jsDeps = gulp.src(['js/*jquery*', 'js/*bootstrap*', 'js/*slick*'])
    	.pipe(concat('main.js'))
    	.pipe(size({
    		title: 'size of js dependencies'
    	}))
    	.pipe(gulp.dest('js/'));
    stream.concat(js, jsDeps)
});


gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['lint', 'scripts']);
    gulp.watch('./styles/scss/*.scss', ['styles']);
});

gulp.task('clean', function() {
	return gulp.src(['styles/css/styles.min.css', './js/all.min.js'], {read: false})
		.pipe(clean());
});





gulp.task('serve', function(){
    browserSync.init({
        server: './'
    });

    browserSync.watch('./**/*.*').on('change', browserSync.reload);
});
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts');
});
