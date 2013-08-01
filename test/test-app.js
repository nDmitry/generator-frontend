/*global describe, beforeEach, it*/

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('app generator', function () {
    this.timeout(10000);

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('frontend:app', [
                '../../app'
            ]);

            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            'src/index.html',
            'src/js/app.js',
            '.editorconfig',
            '.jshintrc',
            '.bowerrc'
        ];

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
