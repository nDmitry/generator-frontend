'use strict';

var util = require('util'),
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

        remote.directory('lib/', 'src/sass/lib/');
        remote.copy('_common.scss', 'src/sass/_common.scss');
        remote.copy('_layouts.scss', 'src/sass/_layouts.scss');
        remote.copy('_print.scss', 'src/sass/_print.scss');
        remote.copy('_screen.scss', 'src/sass/_screen.scss');
        remote.copy('_shame.scss', 'src/sass/_shame.scss');
        remote.copy('_vars.scss', 'src/sass/_vars.scss');
        remote.copy('main.scss', 'src/sass/main.scss');

        cb();
    });
};
