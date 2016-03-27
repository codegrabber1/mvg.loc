/**
 * Created by oleg on 19.02.2016.
 */
var gulp = require('gulp');
    wiredep = require('wiredep').stream;
    sass = require('gulp-sass');
    concatCss = require('gulp-concat-css');
    autoprefixer = require('gulp-autoprefixer');
    livereload = require('gulp-livereload');
    connect = require('gulp-connect');


// bower
gulp.task('bower', function() {
  gulp.src('app/index.html')
      .pipe(wiredep({
        directory : "app/bower_components"
      }))
      .pipe(gulp.dest('app/'));
});
gulp.task('connect', function() {
    connect.server( {
        root: 'app',
        livereload: true
    } );
});

//sass
gulp.task('sass', function () {
    return gulp.src('sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/styles/'))
        .pipe(connect.reload());
});

// html
gulp.task('html', function(){
    gulp.src('app/*.html')
    .pipe(connect.reload());
});

// watch
gulp.task('watch', function() {
    gulp.watch('sass/*.sass', ['sass']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('bower.json', ['bower']);
});

// default
gulp.task('default', ['bower', 'connect', 'html', 'sass', 'watch']);