import angular from 'angular';
import '@uirouter/angularjs';
import carousel from 'angular-ui-bootstrap/src/carousel';

import routing from './home.routes';
import HomeController from './home.controllers';
import smPermission from '../../helpers/directives/sm-permission.directive';
import treeView from '../../helpers/directives/tree-view';
import contextValueService from '../../helpers/services/context-value.service';

export default angular.module('app.home', ['ui.router', carousel, treeView, contextValueService])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;