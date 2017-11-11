var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync');


var paths = {
  "htmlSrc" : "./*.html",
  "scssSrc" : "./src/scss/*.scss",
  "imgSrc"  : "./src/images/**",
  "rootDir" : "./dist/",
  "imgDir"  : "./dist/images/",
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

gulp.task('scss', function() {
  return gulp.src(paths.scssSrc)
    .pipe($.sass()).on('error', $.sass.logError)
    .pipe(gulp.dest(paths.rootDir + 'css'))
    .pipe(browserSync.reload({
      stream: true,
      once  : true
    }));
});

gulp.task('bs-reload', function() {
   browserSync.reload();
});

gulp.task('image', function() {
  return gulp.src(paths.imgSrc)
    .pipe(gulp.dest(paths.imgDir));
});

gulp.task('default', ['image', 'bs', 'scss', 'bs-reload'], function() {
  $.watch([paths.htmlSrc],function(e) {
    gulp.start("bs-reload")
  });
  $.watch([paths.scssSrc],function(e) {
    gulp.start("scss")
  });
  $.watch([paths.imgSrc],function(e) {
    gulp.start("image")
  });
});
