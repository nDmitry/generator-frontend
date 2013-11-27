'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

var StylusGenerator = module.exports = function StylusGenerator() {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(StylusGenerator, yeoman.generators.NamedBase);

StylusGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'path',
            message: 'Path',
            default: 'src/stylus/'
        }
    ];

    this.prompt(prompts, function(props) {
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                this[prop] = props[prop];
            }
        }

        cb();
    }.bind(this));
};

StylusGenerator.prototype.stylus = function stylus() {
    var cb = this.async();

    this.log.info('Fetching Stylus lib...');

    this.remote('nDmitry', 'stylus', function(err, remote) {
        if (err) {
            return cb(err);
        }

        remote.directory('lib/', path.join(this.path, 'lib/'));
        remote.directory('partials/', path.join(this.path, 'partials/'));

        var files = this.expandFiles('*.styl', {
            cwd: remote.cachePath
        });

        files.map(function(filename) {
            remote.copy(filename, path.join(this.path, filename));
        }.bind(this));

        cb();
    }.bind(this));
};
