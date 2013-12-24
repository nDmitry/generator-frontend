/* global describe, it */

'use strict';

var assert = require('assert');

describe('Generator', function() {
    it('can be imported without blowing up (app)', function() {
        var app = require('../app');
        assert(app !== undefined);
    });

    it('can be imported without blowing up (stylus)', function() {
        var stylus = require('../stylus');
        assert(stylus !== undefined);
    });
});
