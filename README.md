# generator-frontend [![Build Status](https://secure.travis-ci.org/nDmitry/generator-frontend.png?branch=master)](https://travis-ci.org/nDmitry/generator-frontend) ![David](https://david-dm.org/nDmitry/generator-frontend.png)

Scaffolds out the ‘boilerplate’ for front-end development with Grunt and Stylus.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Install the generator: `npm install [-g] generator-frontend`
- Run: `yo frontend`

## Subgenerators
Generator includes two subgenerators: `app` and `stylus`. You can run them separately with the commands: `yo frontend:app` and `yo frontend:stylus`.

### App subgenerator

The subgenerator scaffolds out some starting files (e.g. empty `app.js`, EJS templates based on h5bp), Gruntfile.js to process them and build, Bower config files with some often necessary components, `.jshintrc`, `.editorconfig` and `.gitignore`.

List of what my Grunt config can make for you:
* Local Connect web-server
* Live reload
* Compiling EJS templates to HTML
* Compiling Stylus
* Prefixing your output CSS with Autoprefixer
* Spriting with output to sprites.styl file
* CSS liniting
* Compile CJS modules with Browserify
* Concat Bower components
* CSS and JS minification
* Image optimization

### Stylus subgenerator
This subgenerator just fetches my small Stylus [library](https://github.com/nDmitry/stylus) and copies it to `src/stylus` directory (by default).

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
