
import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';

import pagination from 'angular-ui-bootstrap/src/pagination';
import 'jquery-slimscroll';

import routing from './request-update.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import smComponents  from '../../helpers/directives/components';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import requestUpdateService from './request-update.service';
import uploadService from '../upload/upload.service';
import roleGroupService from '../role-group/role-group.service';

import { RequestUpdateController, RequestUpdateCreateController, RequestUpdateUpdateController } from './request-update.controllers';

export default angular.module('app.request-update', [
  'ui.router',
  modal,
  pagination,
  smModalDialog,
  requestUpdateService,
  uploadService,
  roleGroupService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  smComponents,
  toNumberDirective
])
  .config(routing)
  .controller('requestUpdateController', RequestUpdateController)
  .controller('requestUpdateCreateController', RequestUpdateCreateController)
  .controller('requestUpdateUpdateController', RequestUpdateUpdateController)
  .name;