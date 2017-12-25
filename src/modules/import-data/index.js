
import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import pagination from 'angular-ui-bootstrap/src/pagination';
import tabs from 'angular-ui-bootstrap/src/tabs';
import 'jquery-slimscroll';

import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './import-data.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import smComponents  from '../../helpers/directives/components';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import importDataService from './import-data.service';
import uploadService from '../upload/upload.service';
import buildingService from "../building/building.service";
import floorService from "../floor/floor.service";
import { DataImportController } from './import-data.controllers';

export default angular.module('app.importData', [
  'ui.router',
  uiSelect,
  modal,
  tabs,
  datepickerPopup,
  pagination,
  smModalDialog,
  uploadService,
  importDataService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  smComponents,
  toNumberDirective,
  buildingService,
  floorService
])
  .config(routing)
  .controller('DataImportController', DataImportController)
  .name;