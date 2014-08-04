# generator-frontend [![Build Status](https://secure.travis-ci.org/nDmitry/generator-frontend.png?branch=master)](https://travis-ci.org/nDmitry/generator-frontend) ![David](https://david-dm.org/nDmitry/generator-frontend.png)

Scaffolds out a boilerplate for front-end development with Grunt and Sass.

## Getting started
– Install [GraphicsMagick](http://www.graphicsmagick.org/README.html) (`brew install graphicsmagick` for OS X)
- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Install the generator: `npm install [-g] generator-frontend`
- Run: `yo frontend`

## Subgenerators
The generator includes two subgenerators: `app` and `sass`. You can run them with these commands: `yo frontend:app` and `yo frontend:sass`.

### App subgenerator
The subgenerator scaffolds out some starting files (e.g. `app.js`, EJS templates mostly based on h5bp), Gruntfile.js, bower.json, .jshintrc, .editorconfig and .gitignore.

List of what my Grunt config can do for you:
* Local Connect web-server
* Live reloading
* Compiling EJS templates to HTML
* Compiling Sass with Compass
* Prefixing your output CSS with Autoprefixer
* CSS liniting
* CSS and JS concatenation/minification
* Revving filenames
* Images optimization
* And more...

### Sass subgenerator
This subgenerator just fetches my Sass [library](https://github.com/nDmitry/sass) and copies it to `sass` directory (by default).

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
