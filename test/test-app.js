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
            ['src/pages/index.ejs', /<title>Temp<\/title>/, /lang="ru"/],
            'src/pages/partials/header.ejs',
            'src/pages/partials/footer.ejs',
            'src/pages/partials/scripts.ejs',
            'src/js/app.js',
            ['.gitignore', /src\/js/],
            '.editorconfig',
            '.jshintrc',
            '.bowerrc',
            ['bower.json', /"name": "temp"/],
            ['package.json', /"name": "temp"/],
            'Gruntfile.js'
        ];

        helpers.mockPrompt(this.app, {
            projectName: 'temp',
            lang: 'ru'
        });

        this.app.run({}, function() {
            helpers.assertFiles(expected);
            done();
        });
    });
});
