import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';

import routing from './role-group.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import roleGroupService from './role-group.service';

import { RoleGroupController, RoleGroupCreateController, RoleGroupUpdateController } from './role-group.controllers';

export default angular.module('app.roleGroup', [
  'ui.router',
  modal,
  pagination,
  smModalDialog,
  roleGroupService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective
])
  .config(routing)
  .controller('RoleGroupController', RoleGroupController)
  .controller('RoleGroupCreateController', RoleGroupCreateController)
  .controller('RoleGroupUpdateController', RoleGroupUpdateController)
  .name;