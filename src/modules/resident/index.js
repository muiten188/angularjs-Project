
import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import pagination from 'angular-ui-bootstrap/src/pagination';
import tabs from 'angular-ui-bootstrap/src/tabs';
import 'jquery-slimscroll';

import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './resident.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import smComponents  from '../../helpers/directives/components';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import residentService from './resident.service';
import uploadService from '../upload/upload.service';
import apartmentService from '../apartment/apartment.service';

import { ResidentController, ResidentCreateController, ResidentUpdateController, ResidentImportController } from './resident.controllers';

export default angular.module('app.resident', [
  'ui.router',
  uiSelect,
  modal,
  tabs,
  datepickerPopup,
  pagination,
  smModalDialog,
  residentService,
  uploadService,
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
  .controller('ResidentController', ResidentController)
  .controller('ResidentCreateController', ResidentCreateController)
  .controller('ResidentUpdateController', ResidentUpdateController)
  .controller('ResidentImportController', ResidentImportController)
  .name;