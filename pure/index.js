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
            name: 'version',
            message: 'Version',
            default: '0.2.1'
        },
        {
            name: 'path',
            message: 'Path',
            default: 'src/css/vendor/'
        },
        {
            type: 'checkbox',
            name: 'modules',
            message: 'Modules',
            choices: [
                {name: 'base', checked: false},
                {name: 'buttons', checked: true},
                {name: 'forms', checked: true},
                {name: 'grids', checked: true},
                {name: 'menus', checked: true},
                {name: 'tables', checked: true}
            ]
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

StylusGenerator.prototype.pure = function pure() {
    var cb = this.async();

    this.log.info('Fetching Pure lib...');

    var url = 'http://yui.yahooapis.com/combo?';

    this.modules.forEach(function(module) {
        url += 'pure/' + this.version + '/' + module + '.css&';
    }, this);

    this.fetch(url, path.join(this.path, 'pure.css'), function(err) {
        if (err) {
            return cb(err);
        }

        cb();
    });
};
