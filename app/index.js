'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');


var FrontendGenerator = module.exports = function FrontendGenerator() {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.argument('name', {
        type: String,
        required: false
    });

    this.name = this.name || path.basename(process.cwd());
};

util.inherits(FrontendGenerator, yeoman.generators.NamedBase);

FrontendGenerator.prototype.app = function app() {
    this.log.info('Creating front-end scaffolding...');

    // Copy directories
    this.directory('src/', 'src/');

    // Make some empty directories
    this.mkdir('src/fonts');
    this.mkdir('src/img/sprites');

    // Copy config files
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');

    // Compile templates
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_index.html', 'src/index.html');
};
