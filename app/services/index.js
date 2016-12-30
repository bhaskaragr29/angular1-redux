import angular from 'angular';

import httpmiddleware from './http';

export default angular.module('AngularTestApp.middleware', [])
.factory('BaseApi', httpmiddleware)
.name;