'use strict';

var util = require('util'),
    yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.stylus = function stylus() {
    var cb = this.async();

    this.log.info('Fetching Stylus lib...');

    this.remote('nDmitry', 'stylus', function(err, remote) {
        if (err) {
            return cb(err);
        }

        remote.directory('lib/', 'src/stylus/lib/');
        remote.directory('partials/', 'src/stylus/partials/');
        remote.copy('index.styl', 'src/stylus/index.styl');

        cb();
    });
};
