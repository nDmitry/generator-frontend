/*global describe, it*/

'use strict';

var assert = require('assert');

describe('Generator', function () {
    it('can be imported without blowing up (app)', function () {
        var app = require('../app');
        assert(app !== undefined);
    });

    it('can be imported without blowing up (grunt)', function () {
        var app = require('../grunt');
        assert(app !== undefined);
    });

    it('can be imported without blowing up (sass)', function () {
        var app = require('../sass');
        assert(app !== undefined);
    });
});
