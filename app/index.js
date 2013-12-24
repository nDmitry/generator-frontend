'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');


var AppGenerator = module.exports = function AppGenerator(arg, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.bwr = JSON.parse(this.readFileAsString(path.join(__dirname, '/templates/bowerrc')));
};

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

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

    this.prompt(prompts, function(props) {
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                this[prop] = props[prop];
            }
        }

        cb();
    }.bind(this));

};

AppGenerator.prototype.app = function() {
    this.directory('src/', 'src/');

    this.mkdir('src/fonts');
    this.mkdir('src/img/sprites/2x');

    this.copy('_gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');

    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_index.ejs', 'src/pages/index.ejs');
};
