// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var server = require('express');
var tinylr = require('tiny-lr')();
var replace = require('gulp-replace');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

 
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// server task
gulp.task('server', function() {
  var app = server();
  app.use(require('connect-livereload')({port: 2002}));
  app.use(server.static('build'));
  app.listen(2000);
});

// live reload
gulp.task('livereload', function() {
  tinylr.listen(2002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative('build', event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// build tasks
gulp.task('css', function(){
  gulp.src(['./src/css/**/*.css'])
      .pipe(concat('style.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./build/css/'));
});
gulp.task('js', function(){
  gulp.src(['./src/js/**/*.js'])
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./build/js/'))
});
gulp.task('html', function(){
  gulp.src(['./src/**/*.html'])
      .pipe(replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, ''))
      .pipe(replace(/<\/body>/gm, '<script src="js/app.min.js"></script></body>'))
      .pipe(replace(/<link\b[^>]*>/gm, ''))
      .pipe(replace(/<head>/gm, '<head><link rel="stylesheet" href="css/style.min.css">'))
      .pipe(gulp.dest('./build/'))
})

// default gulp task
gulp.task('default', ['server', 'livereload', 'jshint', 'html', 'js', 'css'], function(){
  // watch for HTML changes
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/**/*.html', notifyLiveReload);
  // watch for JS changes
  gulp.watch('./src/js/**/*.js', ['jshint']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/js/**/*.js', notifyLiveReload);
  // watch for CSS changes
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/css/**/*.css', notifyLiveReload);
});