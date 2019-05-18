var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');

var browserSync = require('browser-sync').create();


gulp.task('default', [
	'browser-sync',
	'html-watch-reload',
	'js-watch-reload',
	'sass-watch',
	'sass-compile-reload',
]);


gulp.task('browser-sync', function() {
	browserSync.init({
		startPath: 'index.html',
		server: {
			baseDir: './',
		}
	});
});

gulp.task('html-watch-reload', function() {
	gulp.watch('./*.html').on('change', function() {
		console.log(new Date(), 'HTML was changed');
		browserSync.reload();
	});
});

gulp.task('js-watch-reload', function() {
	gulp.watch('./scripts/*.js').on('change', function() {
		console.log(new Date(), 'JS was changed');
		browserSync.reload();
	});
});


gulp.task('sass-watch', function () {
	gulp.watch('./style/style.sass', ['sass-compile-reload']);
});

gulp.task('sass-compile-reload', function () {
	console.log(new Date(), 'Recompile styles...')
	gulp.src('./style/style.sass')
		.pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError(function (error) {
			return error.message;
		})))
		.pipe(gulp.dest('./style/'))
		.pipe(browserSync.stream());
});