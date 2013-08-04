'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');


var FrontendGenerator = module.exports = function FrontendGenerator(arg, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.bwr = JSON.parse(this.readFileAsString(path.join(__dirname, '/templates/bowerrc')));
};

util.inherits(FrontendGenerator, yeoman.generators.NamedBase);

FrontendGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'projectName',
        message: 'Project Name',
        default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function(props) {
        this.projectName = props.projectName;
        cb();
    }.bind(this));
};

FrontendGenerator.prototype.app = function app() {
    this.log.info('Creating front-end scaffolding...');

    // Copy directories
    this.directory('src/', 'src/');

    // Make some empty directories
    this.mkdir('src/fonts');
    this.mkdir('src/img/sprites');

    // Copy config files
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');

    // Compile templates
    this.template('_gitignore', '.gitignore');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_layout.hbs', 'src/layout.hbs');
};
