var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
 
gulp.task('bower', function() {
  return bower()
      .pipe(gulp.dest('dist/public/'));
});

gulp.task('clean-bower-components', ['bower'], function (cb) {
  gulp.src('bower_components', {read: false})
    .pipe(clean());
});
 

gulp.task('default', ['clean-bower-components']);