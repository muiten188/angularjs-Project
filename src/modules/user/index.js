import 'bootstrap-daterangepicker/daterangepicker.css';

import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import bsdatepicker from 'bootstrap-daterangepicker';
import daterangepicker from 'angular-daterangepicker';

import routing from './user.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';
import userService from './user.service';

import controllers from './user.controllers';

export default angular.module('app.user', [
    'ui.router',
    modal,
    pagination,
    smModalDialog,
    userService,
    localeToastrService,
    confirmDialog,
    stTableDirective,
    sortByDirective,
    toNumberDirective,
    daterangepicker
  ])
  .config(routing)
  .controller('UserController', controllers.UserController)
  .controller('UserUpdateController', controllers.UserUpdateController)
  .name;