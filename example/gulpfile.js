var gulp = require('gulp');
var gutil = require('gulp-util');
var codebot = require('../');

var modules = [
  './templates/app',
  './templates/server'
];

gulp.task('codebot', function(done){
	return gulp.src('./model.json')
		.pipe(codebot({ modules: modules, loglevel: 'verbose' }))
		.pipe(gulp.dest('./src'))
		.on('error', gutil.log);
});

gulp.task('default', ['codebot']);