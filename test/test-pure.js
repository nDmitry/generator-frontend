/* global describe, beforeEach, it */

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('pure generator', function() {
    this.timeout(10000);

    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('frontend:pure', [
                '../../pure'
            ]);

            this.app.options['skip-install'] = true;

            done();
        }.bind(this));
    });

    it('creates expected files', function(done) {
        var expected = [
            'src/css/vendor/pure.css',
        ];

        helpers.mockPrompt(this.app, {
            version: '0.2.1',
            path: 'src/css/vendor/',
            modules: ['buttons', 'forms', 'grids', 'menus', 'tables']
        });

        this.app.run({}, function() {
            helpers.assertFiles(expected);
            done();
        });
    });
});
