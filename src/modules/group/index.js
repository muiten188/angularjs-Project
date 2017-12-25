import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './group.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import groupService from './group.service';
import apartmentService from '../apartment/apartment.service';

import { GroupController, GroupCreateController, GroupUpdateController } from './group.controllers';

export default angular.module('app.group', [
  'ui.router',
  uiSelect,
  modal,
  pagination,
  smModalDialog,
  groupService,
  apartmentService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective
])
  .config(routing)
  .controller('GroupController', GroupController)
  .controller('GroupCreateController', GroupCreateController)
  .controller('GroupUpdateController', GroupUpdateController)
  .name;