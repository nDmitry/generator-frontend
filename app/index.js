'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');


var FrontendGenerator = module.exports = function FrontendGenerator(arg, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.bwr = JSON.parse(this.readFileAsString(path.join(__dirname, '/templates/bowerrc')));
};

util.inherits(FrontendGenerator, yeoman.generators.NamedBase);

FrontendGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var deps = {
        angular: '~1.0.7',
        jquery: '~1.10',
        flexslider: '*',
        herotabs: 'git://github.com/simonsmith/jquery.herotabs.git#1.2',
        powertip: 'http://stevenbenner.github.io/jquery-powertip/releases/jquery.powertip-1.2.0.zip',
        bpopup: '~0.9'
    };

    function getDeps(props) {
        var d = {};

        for (var prop in props) {
            if (deps[prop] && props[prop] && deps.hasOwnProperty(prop)) {
                d[prop] = deps[prop];
            }
        }

        return d;
    }

    var prompts = [
        {
            name: 'projectName',
            message: 'Project Name',
            default: path.basename(process.cwd())
        },
        {
            name: 'lang',
            message: 'Project Language',
            default: 'ru'
        }
    ];

    // Add prompt for each Bower component
    for (var dep in deps) {
        if (deps.hasOwnProperty(dep)) {
            prompts.push({
                type: 'confirm',
                name: dep,
                message: 'Include ' + dep + ' component?',
                default: (dep === 'angular')
            });
        }
    }

    this.prompt(prompts, function(props) {
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                this[prop] = props[prop];
            }
        }

        this.deps = JSON.stringify(getDeps(props));
        cb();
    }.bind(this));

};

FrontendGenerator.prototype.common = function() {
    this.mkdir('src/fonts');
    this.mkdir('src/img/sprites');

    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');

    this.template('_gitignore', '.gitignore');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
};

FrontendGenerator.prototype.app = function app() {
    if (this.angular) {
        this.directory('scaffoldings/spa/', 'src/');
        this.template('scaffoldings/_index.html', 'src/index.html');

        this.mkdir('src/views');
        this.mkdir('src/js/directives');
        this.mkdir('src/js/controllers');
        this.mkdir('src/js/services');
    } else {
        this.directory('scaffoldings/classic/', 'src/');
        this.template('scaffoldings/_layout.hbs', 'src/layout.hbs');
    }
};
