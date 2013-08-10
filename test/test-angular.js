/*global describe, beforeEach, it*/

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('app generator (angular: true)', function() {
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
            ['src/index.html', /<title>Temp<\/title>/, /lang="ru"/],
            'src/js/app.js',
            ['.gitignore', /src\/js/],
            '.editorconfig',
            '.jshintrc',
            '.bowerrc',
            ['bower.json', /"name": "temp"/],
            ['package.json', /"name": "temp"/],
            ['Gruntfile.js', /copy:views/]
        ];

        helpers.mockPrompt(this.app, {
            projectName: 'temp',
            lang: 'ru',
            angular: true,
            jquery: false,
            flexslider: false,
            herotabs: false,
            powertip: false,
            bpopup: false
        });

        this.app.run({}, function() {
            helpers.assertFiles(expected);
            done();
        });
    });
});
