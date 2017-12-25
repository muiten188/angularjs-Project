import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './apartment-message.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import apartmentMessageService from './apartment-message.service';
import buildingService from '../building/building.service';
import floorService from '../floor/floor.service';
import apartmentService from '../apartment/apartment.service';
import templateService from '../template/template.service';
import groupService from '../group/group.service';
import uploadService from '../upload/upload.service';

import smComponents  from '../../helpers/directives/components';
import smFilters  from '../../helpers/filters';

import { ApartmentMessageController, ApartmentMessageCreateController, ApartmentMessageUpdateController } from './apartment-message.controllers';

export default angular.module('app.apartmentMessage', [
  'ui.router',
  uiSelect,
  modal,
  pagination,
  smModalDialog,
  smComponents,
  smFilters,
  apartmentMessageService,
  buildingService,
  floorService,
  apartmentService,
  groupService,
  templateService,
  uploadService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective
])
  .config(routing)
  .controller('ApartmentMessageController', ApartmentMessageController)
  .controller('ApartmentMessageCreateController', ApartmentMessageCreateController)
  .controller('ApartmentMessageUpdateController', ApartmentMessageUpdateController)
  .name;