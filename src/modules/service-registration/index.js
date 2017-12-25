import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import 'ng-file-upload';
import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './service-registration.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import toStringDirective from '../../helpers/directives/to-string.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';
import pictureDialog from '../../helpers/services/picture-dialog';

import serviceRegistrationService from './service-registration.service';
import buildingService from '../building/building.service';
import floorService from '../floor/floor.service';
import uploadService from '../upload/upload.service';
import apartmentService from '../apartment/apartment.service';
import serviceService from '../service/service.service';
import templateService from '../template/template.service';
import tariffService from '../tariff/tariff.service';
import fileInput from '../../helpers/directives/file-input/file-input.directive';
import { ServiceRegistrationController, ServiceRegistrationCreateController, ServiceRegistrationUpdateController } from './service-registration.controllers';

export default angular.module('app.serviceRegistration', [
  'ui.router',
  'ngFileUpload',
  uiSelect,
  modal,
  pagination,
  smModalDialog,
  serviceRegistrationService,
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
  toStringDirective,
  apartmentService,
  serviceService,
  templateService,
  tariffService,
  fileInput
])
  .config(routing)
  .controller('ServiceRegistrationController', ServiceRegistrationController)
  .controller('ServiceRegistrationCreateController', ServiceRegistrationCreateController)
  .controller('ServiceRegistrationUpdateController', ServiceRegistrationUpdateController)
  .name;