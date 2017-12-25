import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import 'ng-file-upload';
import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './apartment.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';
import pictureDialog from '../../helpers/services/picture-dialog';

import apartmentService from './apartment.service';
import buildingService from '../building/building.service';
import floorService from '../floor/floor.service';
import uploadService from '../upload/upload.service';
import tariffService from '../tariff/tariff.service';

import { ApartmentController, ApartmentCreateController, ApartmentUpdateController } from './apartment.controllers';

export default angular.module('app.apartment', [
  'ui.router',
  'ngFileUpload',
  uiSelect,
  modal,
  pagination,
  smModalDialog,
  apartmentService,
  uploadService,
  buildingService,
  floorService,
  localeToastrService,
  confirmDialog,
  pictureDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective,
  tariffService
])
  .config(routing)
  .controller('ApartmentController', ApartmentController)
  .controller('ApartmentCreateController', ApartmentCreateController)
  .controller('ApartmentUpdateController', ApartmentUpdateController)
  .name;