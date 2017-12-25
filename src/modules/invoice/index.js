import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import 'ng-file-upload';
import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './invoice.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';
import pictureDialog from '../../helpers/services/picture-dialog';

import invoiceService from './invoice.service';
import buildingService from '../building/building.service';
import floorService from '../floor/floor.service';
import uploadService from '../upload/upload.service';

import { InvoiceController, InvoiceGenerateController, InvoiceUpdateController } from './invoice.controllers';

export default angular.module('app.invoice', [
  'ui.router',
  'ngFileUpload',
  uiSelect,
  modal,
  pagination,
  smModalDialog,
  invoiceService,
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
  toNumberDirective
])
  .config(routing)
  .controller('InvoiceController', InvoiceController)
  .controller('InvoiceGenerateController', InvoiceGenerateController)
  .controller('InvoiceUpdateController', InvoiceUpdateController)
  .name;