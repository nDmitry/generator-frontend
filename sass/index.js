'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator () {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.sass = function sass () {
    var cb = this.async();

    this.log.info('Fetching SASS lib...');

    this.remote('nDmitry', 'sass', function(err, remote) {
        if (err) { return cb(err); }

        remote.directory('.', 'src/sass/');

        cb();
    });
};

Generator.prototype.remove = function remove () {
    fs.unlinkSync(path.join(process.cwd(), 'src/sass/.gitignore'));
};
