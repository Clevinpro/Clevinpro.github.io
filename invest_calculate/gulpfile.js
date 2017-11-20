var gulp = require('gulp'),
  cache = require('gulp-cache'),
  clean = require('gulp-clean'),
  stream = require('event-stream'),
  size = require('gulp-size'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  // imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  gm = require('gulp-gm');


// Проверка ошибок в скриптах
gulp.task('lint', function() {
  return gulp.src(['assets/js/*.js', '!assets/js/*.min.js', '!assets/js/*jquery*', '!assets/s/*bootstrap*'])
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
  return gulp.src(['assets/scss/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle : 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
});


// Конкатенация и минификация скриптов
// Тут выделяются два контекста - jquery-плагины / наши скрипты и зависимости (то без чего
// не будет работать хотя бы один наш скрипт, например jquery)
// Так как это просто пример, то лучшим вариантом было бы разделение на основные и
// вспомогательные скрипты (например основные - jquery/bootstrap и вспомогательные - lightbox/fotorama)
gulp.task('scriptsRun', function() {
  var js = gulp.src(['assets/js/calculate.js'])
    .pipe(concat('calculate.min.js'))
    .pipe(uglify())
    .pipe(size({
      title: 'size of calculate js'
    }))
    .pipe(gulp.dest('assets/js/'));
  stream.concat(js)
});



// Чистим директорию назначения и делаем ребилд, чтобы удаленные из проекта файлы не остались
gulp.task('clean', function() {
  return gulp.src(['assets/js/calculate.min.js'], {read: false})
    .pipe(clean());
});

// запуск сервера с live reload
gulp.task('serve', function() {
  browserSync.init({
    server: './'
  });
  browserSync.watch('./**/*.html').on('change', browserSync.reload);
  browserSync.watch('./assets/css/styles.min.css').on('change', browserSync.reload);
  browserSync.watch('./assets/js/calculate.min.js').on('change', browserSync.reload);
});

// Наблюдение за изменениями и автосборка
// После первого запуска (команда gulp в консоли) выполняем gulp watch,
// чтобы следитть за изменениями и автоматически пересобирать исходники с учетом 
// последних изменений
gulp.task('watch', function() {
  gulp.watch('assets/scss/*.scss', ['styles']);
  gulp.watch('assets/js/calculate.js', ['scripts']);
});

// Выполняем по-умолчанию (вначале очистка и ребилд директории назначения, а потом выполнение остальных задач)
gulp.task('scripts', ['clean'], function() {
  gulp.start('scriptsRun');
});
// Наблюдение за изменениями и автосборка + запуск сервера с live reload
gulp.task('dev', ['watch', 'serve']);

