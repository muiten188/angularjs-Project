
import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import 'jquery-slimscroll';

import routing from './service.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import serviceService from './service.service';
import tariffService from '../tariff/tariff.service';

import { ServiceController, ServiceCreateController, ServiceUpdateController } from './service.controllers';

export default angular.module('app.service', [
  'ui.router',
  modal,
  pagination,
  smModalDialog,
  serviceService,
  tariffService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective
])
  .config(routing)
  .controller('ServiceController', ServiceController)
  .controller('ServiceCreateController', ServiceCreateController)
  .controller('ServiceUpdateController', ServiceUpdateController)
  .name;