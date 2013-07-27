'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator () {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.stylus = function stylus () {
    var cb = this.async();

    this.log.info('Fetching Stylus lib...');

    this.remote('nDmitry', 'stylus', function(err, remote) {
        if (err) { return cb(err); }

        remote.directory('.', 'src/stylus/');

        cb();
    });
};

Generator.prototype.remove = function remove () {
    fs.unlinkSync(path.join(process.cwd(), 'src/stylus/.gitignore'));
};
