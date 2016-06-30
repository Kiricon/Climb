const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('./js/**/*.js', ['reload']);
});

gulp.task('run', ['browser-sync', 'watch']);
