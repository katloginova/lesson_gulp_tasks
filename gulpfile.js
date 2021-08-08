const {
    parallel,
    series,
    src,
    dest,
    watch
} = require('gulp');

const path = require('path');

const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

function copyHtml() {
    return src(path.resolve(__dirname, 'src', 'index.html'))
        .pipe(dest(path.resolve(__dirname, 'dist')));
}

function copyJs() {
    return src(path.resolve(__dirname, 'src', 'scripts', '**', '*.js'))
        .pipe(concat('app.js'))
        .pipe(dest(path.resolve(__dirname, 'dist', 'scripts')));
}

function copyJsMin() {
    return src(path.resolve(__dirname, 'src', 'scripts', '**', '*.js'))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(dest(path.resolve(__dirname, 'dist', 'scripts')));
}

function copyVenderJs() {
    return src(path.resolve(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'))
        .pipe(concat('vendor.js'))
        .pipe(dest(path.resolve(__dirname, 'dist', 'scripts')));
}


function copyCss() {
    return src(path.resolve(__dirname, 'src', 'styles', '*.scss'))
        .pipe(sass())
        .pipe(dest(path.resolve(__dirname, 'dist', 'styles')));
}

function copyCssMin() {
    return src(path.resolve(__dirname, 'src', 'styles', '*.scss'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(dest(path.resolve(__dirname, 'dist', 'styles')));
}

function serve(cb){
    watch('./src/scripts/**/*.js', series(copyJsMin, browserSync.reload));
    watch('./src/styles/**/*.scss', copyCssMin);
    watch('./src/index.html', copyHtml);

    browserSync.init({
        server: {
            baseDir: './dist',
        },
    });

}

module.exports = {
    serve: series(parallel(copyHtml, copyJsMin, copyCssMin, copyVenderJs), serve),
    build: parallel(copyHtml, copyJs, copyCss, copyVenderJs),
    minify: parallel(copyHtml, copyJsMin, copyCssMin, copyVenderJs),
};