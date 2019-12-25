const { series, watch, src, dest } = require('gulp'),
    browserSync  = require('browser-sync').create(),
    gulpSass         = require('gulp-sass'),
    concatCss    = require('gulp-concat-css');

function serve() {
    sass();
    browserSync.init({
        server: "./src"
    });
    watch("src/sass/**/*.sass", sass);
    watch("src/js/**/*.js", js).on('change', browserSync.reload);;
    watch("src/*.html").on('change', browserSync.reload);
}

function sass() {
    return src("src/sass/**/*.sass")
        .pipe(gulpSass())
        .pipe(concatCss("style.css"))
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
}

function js() {

}

exports.serve = serve;
exports.sass = sass;
exports.default = serve;

// Запускаем сервер + отслеживаем sass/html файлы
// gulp.task('serve', ['sass'], function() {

//     browserSync.init({
//         server: "./src"
//     });

//     gulp.watch("src/sass/**/*.sass", ['sass']);
//     gulp.watch("src/*.html").on('change', browserSync.reload);
// });

// Компилируем sass в CSS и вставляем изменения в браузер
// gulp.task('sass', function() {
//     return gulp.src("src/sass/**/*.sass")
//         .pipe(sass())
//         .pipe(concatCss("style.css"))
//         .pipe(gulp.dest("src/css"))
//         .pipe(browserSync.stream());
// });

/*// Выгружаем все файлы через FTP на хостинг
gulp.task('ftp', function () {
return gulp.src('src/**')
.pipe(ftp({
    host: '',
    user: '',
    pass: '',
    remotePath: '/'
}))
.pipe(gutil.noop());
});
*/
// gulp.task('default', ['serve']);