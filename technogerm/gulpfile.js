var gulp = require('gulp'),
	cache = require('gulp-cache'),
	clean = require('gulp-clean'),
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
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync');

// Проверка ошибок в скриптах
gulp.task('lint', function() {
    return gulp.src(['src/js/*.js', '!src/js/*.min.js', '!src/js/*jquery*', '!src/s/*bootstrap*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Конкатенация и минификация стилей
// При указании исходников в gulp.src учитывается порядок в котором они указаны,
// то есть первыми в итоговом файле будут стили бустрапа, потому что мы должны
// вначале объявить их, чтобы потому переопределить на свои стили
// То же самое касается скриптов - мы вначале объявляем зависимости и уже потом
// подключаем наши скрипты (например первым будет всегда jquery, если он используется
// в проекте, а уже следом все остальные скрипты)
gulp.task('styles', function() {
    return gulp.src(['src/scss/main.scss'])

        
        .pipe(sourcemaps.init())     
        .pipe(sass({outputStyle : 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
    	.pipe(concat('styles.min.css'))
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('bs', function() {
  return gulp.src(['src/css/bootstrap/bootstrap.css'])


    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('bootstrap.min.css'))
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'))
});

// Конкатенация и минификация скриптов
// Тут выделяются два контекста - jquery-плагины / наши скрипты и зависимости (то без чего
// не будет работать хотя бы один наш скрипт, например jquery)
// Так как это просто пример, то лучшим вариантом было бы разделение на основные и
// вспомогательные скрипты (например основные - jquery/bootstrap и вспомогательные - lightbox/fotorama)
gulp.task('scriptsRun', function() {
    var js = gulp.src(['src/js/*.js', '!src/js/*jquery*', '!src/js/*spritespin*', '!src/js/*bootstrap*', '!src/js/*slick*'])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(size({
        	title: 'size of custom js'
        }))
        .pipe(gulp.dest('src/js/'));
    var jsDeps = gulp.src(['src/js/*jquery*', 'src/js/*spritespin*', 'src/js/*bootstrap*', 'src/js/*slick*', '!src/js/main.js', '!src/js/ajax.js'])
    	.pipe(concat('vendors.min.js'))
    	.pipe(size({
    		title: 'size of js dependencies'
    	}))
    	.pipe(gulp.dest('src/js/'));
    stream.concat(js, jsDeps)
});


// Сжатие изображений (кэшируем, чтобы сжимать только изменившиеся изображения)
// optimizationLevel - это количество проходов, диапазон параметра 0-7 и начиная с 1 включается компрессия
gulp.task('images', function () {
    return gulp.src(['src/image/**/*.*', '!images/*.db'])
        .pipe(cache(imagemin({
        	optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(size({
        	title: 'size of images'
        }))
        .pipe(gulp.dest('src/image/'));
});

// Чистим директорию назначения и делаем ребилд, чтобы удаленные из проекта файлы не остались
gulp.task('clean', function() {
  return gulp.src(['src/js/all.min.js', 'src/js/vendors.min.js'], {read: false})
    .pipe(clean());
});

// запуск сервера с live reload
gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });
  browserSync.watch('./**/*.html').on('change', browserSync.reload);
  browserSync.watch('./src/css/styles.min.css').on('change', browserSync.reload);
  browserSync.watch('./src/js/all.min.js').on('change', browserSync.reload);
});

// Наблюдение за изменениями и автосборка
// После первого запуска (команда gulp в консоли) выполняем gulp watch,
// чтобы следитть за изменениями и автоматически пересобирать исходники с учетом 
// последних изменений
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/images/*', ['images']);
});

// Выполняем по-умолчанию (вначале очистка и ребилд директории назначения, а потом выполнение остальных задач)
gulp.task('scripts', ['clean'], function() {
    gulp.start('scriptsRun');
});
// Наблюдение за изменениями и автосборка + запуск сервера с live reload
gulp.task('dev', ['watch', 'serve']);