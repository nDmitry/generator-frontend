/* global describe, beforeEach, it */

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('sass generator', function() {
    this.timeout(10000);

    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('frontend:sass', [
                '../../sass'
            ]);

            this.app.options['skip-install'] = true;

            done();
        }.bind(this));
    });

    it('creates expected files', function(done) {
        var expected = [
            'sass/main.scss',
            'config.rb'
        ];

        helpers.mockPrompt(this.app, {
            path: 'sass/'
        });

        this.app.run({}, function() {
            helpers.assertFile(expected);
            done();
        });
    });
});
