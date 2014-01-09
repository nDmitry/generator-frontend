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
            'src/pages/index.ejs',
            'src/pages/partials/header.ejs',
            'src/pages/partials/footer.ejs',
            'src/pages/partials/scripts.ejs',
            'src/js/app.js',
            '.gitignore',
            '.editorconfig',
            '.jshintrc',
            '.bowerrc',
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
            ['src/pages/index.ejs', /<title>Temp<\/title>/, /lang="ru"/],
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
