var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync');


var paths = {
  "htmlSrc" : "./*.html",
}

gulp.task('bs', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify  : true,
    xip     : false
  });
});

gulp.task('bs-reload', function() {
   browserSync.reload();
});

gulp.task('default', ['bs', 'bs-reload'], function() {
  $.watch([paths.htmlSrc],function(e) {
    gulp.start("bs-reload")
  });
});
