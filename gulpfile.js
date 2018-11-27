// including plugins
var gulp = require('gulp'),
    argv = require('yargs').argv,
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-clean-css"),
    jshint = require("gulp-jshint"),
    rename = require("gulp-rename"),
    gulpif = require('gulp-if'),
    clean = require('gulp-clean'),
    config = {
        isMin: true
    };

gulp.task('default', function() {
    gulp.start('jsLint');
});

gulp.task('clean', function() {
    return gulp
        .src('./dist')
        .pipe(clean({
            force: true
        }));
});

gulp.task('chrome', function() {
    config.isMin = argv.dev === undefined;
    gulp
        .start('jsLint')
        .start('build-chrome-ext');
});

// task
gulp.task('jsLint', function() {
    gulp.src('./src/*.js') // path to your files
        .pipe(jshint())
        .pipe(jshint.reporter()); // Dump results
});

// task
gulp.task('build-chrome-ext', function() {
    var icons = [{
                src: './src/icons/icon_19.png',
                dest: 'icon.png'
            },
            {
                src: './src//icons/icon_128.png',
                dest: 'icon_128.png'
            }
        ],
        scripts = ['./src/extensions/chrome/js/init.js',
            './src/extensions/chrome/js/views/**/*.js',
            './src/extensions/chrome/js/models/**/*.js',
            './src/extensions/chrome/js/view-model.js'
        ];
    gulp
        .src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulpif(config.isMin, uglify()))
        .pipe(gulp.dest('dist/extensions/chrome/js'));

    gulp
        .src('./src/extensions/chrome/css/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulpif(config.isMin, minifyCss()))
        .pipe(gulp.dest('dist/extensions/chrome/css'));

    gulp
        .src('./src/extensions/chrome/*.*')
        .pipe(gulp.dest('dist/extensions/chrome'));

    icons.forEach(function(icon) {
        gulp
            .src(icon.src)
            .pipe(rename(icon.dest))
            .pipe(gulp.dest('dist/extensions/chrome/content'));
    });
});