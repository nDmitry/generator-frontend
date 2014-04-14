'use strict';

var path = require('path'),
    yo = require('yeoman-generator');

module.exports = yo.generators.Base.extend({
    askFor: function() {
        var cb = this.async();

        var prompts = [
            {
                name: 'path',
                message: 'Path',
                default: 'sass/'
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
    },

    scaffold: function() {
        var cb = this.async();

        this.log.info('Fetching Sass framework...');

        this.remote('nDmitry', 'sass', function(err, remote) {
            if (err) {
                return cb(err);
            }

            remote.directory('sass/', this.path);
            remote.copy('config.rb', 'config.rb');

            cb();
        }.bind(this));

        this.mkdir('img/sprites');
        this.mkdir('img/sprites_2x');
    }
});
