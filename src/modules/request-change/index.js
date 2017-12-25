import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';

import routing from './request-change.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import requestChangeService from './request-change.service';

import { RequestChangeController, RequestChangeNewController, RequestChangeModifyController } from './request-change.controllers';

export default angular.module('app.requestChange', [
  'ui.router',
  modal,
  pagination,
  smModalDialog,
  requestChangeService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective
])
  .config(routing)
  .controller('RequestChangeController', RequestChangeController)
  .controller('RequestChangeNewController', RequestChangeNewController)
  .controller('RequestChangeModifyController', RequestChangeModifyController)
  .name;