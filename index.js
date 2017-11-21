var through = require('through2');
var gutil = require('gulp-util');
var codebot = require('codebot');
var assign = require('object-assign');
var Vinyl = require('vinyl');

var PLUGIN_NAME = 'codebot';

module.exports = function (data, options, settings) {
  data = data || {};
  options = options || {};
  settings = settings || {};

  var line = '';

  // customize the log
  var _stdout = {
  	write: function(){
  		for (var i = 0; i < arguments.length; i++)
    		line += arguments[i];
  		if (line.indexOf('\n') !== -1){
  			gutil.log.apply(gutil, [PLUGIN_NAME, line.replace('\n', '')]);
  			line = '';
  		}
  	}
  };

	var writer = function(collection){
		return function(item, content){
		  var nfile = new Vinyl({
				path: item.fullname,
				contents: new Buffer(content)
			});
			collection.push(nfile);
		};
	};

  return through.obj(function (file, enc, cb) {
  	var self = this;
  	if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams not supported!'));
	  }
  	var model = JSON.parse(file.contents);
	 	var copsDefaults = {
	  	output: options.output || './',
	  	model: model,
	  	writer: writer(this),
	  	stdout: _stdout,
	  	loglevel: 'error'
	  };

	  var cops = assign({}, copsDefaults, data);

	  codebot(cops)
	  	.then(function(){
	  		cb(null);
	  		self.emit('end');
	  	})
	  	.catch(function(err){
	  		self.emit('error', new gutil.PluginError(PLUGIN_NAME, err.toString()));
	  	});
  });
};