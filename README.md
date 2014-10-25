# generator-frontend [![Build Status](https://secure.travis-ci.org/nDmitry/generator-frontend.png?branch=master)](https://travis-ci.org/nDmitry/generator-frontend) ![David](https://david-dm.org/nDmitry/generator-frontend.png)

Scaffolds out a boilerplate for front-end development with Grunt and Sass.

* Local Connect web-server
* Live reloading
* Jade templates
* Sass with Compass and Susy
* Prefixing your CSS with Autoprefixer
* CSS linting
* CSS and JS concatenation/minification
* Resources revving
* Image optimization
* And more...

## Getting started
– Install [GraphicsMagick](http://www.graphicsmagick.org/README.html) (`brew install graphicsmagick` for OS X)
- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Install the generator: `npm install [-g] generator-frontend`
- Run: `yo frontend`

## Subgenerators
The generator includes two subgenerators: `app` and `sass`. You can run them with these commands: `yo frontend:app` and `yo frontend:sass`.

### App subgenerator
Scaffolds out some starting files and configs.

### Sass subgenerator
Fetches my Sass [library](https://github.com/nDmitry/sass) and copies it to `sass` directory (by default).

You should install some required gems first:

```
$ gem install sass compass susy
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
