var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function(){
  return console.log('Gulp is running...');
});

// Copy All HTML files
gulp.task('copyHtml', function(){
  gulp.src('app/*.html')
      .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('app/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// Minify JS
gulp.task('minify', function(){
  gulp.src('app/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function(){
  gulp.src('app/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function(){
  gulp.src('app/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);

gulp.task('watch', function(){
  gulp.watch('app/js/*.js', ['scripts']);
  gulp.watch('app/images/*', ['imageMin']);
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch('app/*.html', ['copyHtml']);
});