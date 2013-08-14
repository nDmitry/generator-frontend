/* global angular */

'use strict';

var app = angular.module('app', []);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/.html',
            // controller: Ctrl
        }).otherwise({
            redirectTo: '/'
        });
});
