const {
    parallel,
    series,
    src,
    dest
} = require('gulp');

const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

function copyHtml() {
    return src('./src/index.html')
        .pipe(dest('./dist'));
}

function copyJs() {
    return src('./src/scripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(dest('./dist/scripts'));
}

function copyJsMin() {
    return src('./src/scripts/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(dest('./dist/scripts'));
}

function copyCss() {
    return src('./src/styles/*.scss')
        .pipe(sass())
        .pipe(dest('./dist/styles'));
}

function copyCssMin() {
    return src('./src/styles/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(dest('./dist/styles'));
}

module.exports = {
    build: parallel(copyHtml, copyJs, copyCss),
    minify: parallel(copyHtml, copyJsMin, copyCssMin),
};