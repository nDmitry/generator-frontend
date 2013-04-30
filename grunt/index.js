'use strict';

var util = require('util'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator () {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.grunt = function grunt () {
    var cb = this.async();

    this.log.info('Fetching Grunt boilerplate...');

    this.remote('nDmitry', 'grunt-frontend', function(err, remote) {
        if (err) { return cb(err); }

        remote.copy('Gruntfile.js', 'Gruntfile.js');
        remote.copy('package.json', 'package.json');

        cb();
    });
};
