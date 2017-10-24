# gulp-codebot

[CodebotJS](https://github.com/codebotjs/codebot) plugins for [Gulp](https://gulpjs.com/)

## Usage

```
npm i --save-dev gulp-codebot
```

```js
var codebot = require('gulp-codebot');

var modules = [
  '/path/from/templates/module1',
  '/path/from/templates/module2'
];

gulp.src('./model.json')
		.pipe(codebot({ modules: modules }))
		.pipe(gulp.dest('./src'));
```