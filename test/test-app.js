/* global describe, beforeEach, it */

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('app generator', function() {
    this.timeout(10000);

    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('frontend:app', [
                '../../app'
            ]);

            this.app.options['skip-install'] = true;

            done();
        }.bind(this));
    });

    it('creates expected files', function(done) {
        var expected = [
            'pages/layout.jade',
            'pages/index.jade',
            'js/app.js',
            '.gitignore',
            '.editorconfig',
            '.jshintrc',
            'Gruntfile.js',
            'bower.json',
            'package.json'
        ];

        helpers.mockPrompt(this.app, {
            projectName: 'temp',
            lang: 'ru'
        });

        this.app.run({}, function() {
            helpers.assertFile(expected);
            done();
        });
    });

    it('replaces templates variables', function(done) {
        var expected = [
            ['pages/layout.jade', /title Temp/, /lang="ru"/],
            ['bower.json', /"name": "temp"/],
            ['package.json', /"name": "temp"/],
        ];

        helpers.mockPrompt(this.app, {
            projectName: 'temp',
            lang: 'ru'
        });

        this.app.run({}, function() {
            helpers.assertFileContent(expected);
            done();
        });
    });
});
