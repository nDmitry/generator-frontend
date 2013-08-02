'use strict';

var util = require('util'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator () {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.scaffold = function scaffold () {
    this.log.info('Creating front-end scaffolding...');

    this.directory('out/', 'out/');
    this.directory('src/', 'src/');
    this.mkdir('src/fonts');
    this.mkdir('src/img');
    this.mkdir('src/img/sprites');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('bower.json', 'bower.json');
};
