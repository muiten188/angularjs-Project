import angular from 'angular';
import '@uirouter/angularjs';

import routing from './test.routes';
import controllers from './test.controllers';
import modal from 'angular-ui-bootstrap/src/modal';
import userService from '../user/user.service';

export default angular.module('app.test', [
    'ui.router',modal,userService
  ])
  .config(routing)
  .controller('TestController', controllers.TestController)
  .name;