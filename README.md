# gulp-codebot

[CodebotJS](https://github.com/codebotjs/codebot) plugins for [Gulp](https://gulpjs.com/)

## Usage

```
npm i --save-dev gulp-codebot
```

```js
var codebot = require('gulp-codebot');

var rootPath = '/path/to';

var modules = [
  '/path/from/templates/module1',
  '/path/from/templates/module2'
];

// codebot needs the output path to filter non override files
gulp.src('./model.json')
		.pipe(codebot({ modules: modules, output: rootPath+'/dist' }))
		.pipe(gulp.dest(rootPath));
```