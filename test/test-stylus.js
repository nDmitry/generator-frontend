/* global describe, beforeEach, it */

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('stylus generator', function() {
    this.timeout(10000);

    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('frontend:stylus', [
                '../../stylus'
            ]);

            this.app.options['skip-install'] = true;

            done();
        }.bind(this));
    });

    it('creates expected files', function(done) {
        var expected = [
            'src/stylus/index.styl',
            'src/stylus/lib/index.styl',
            'src/stylus/lib/base/index.styl',
            'src/stylus/lib/mixins/index.styl',
            'src/stylus/lib/functions/index.styl'
        ];

        helpers.mockPrompt(this.app, {
            path: 'src/stylus/'
        });

        this.app.run({}, function() {
            helpers.assertFiles(expected);
            done();
        });
    });
});
