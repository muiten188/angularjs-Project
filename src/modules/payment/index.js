import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import 'ng-file-upload';
import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

import routing from './payment.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';

import paymentService from './payment.service';
import apartmentService from '../apartment/apartment.service';
import invoiceService from '../invoice/invoice.service';

import { PaymentController, PaymentCreateController, PaymentUpdateController } from './payment.controllers';

export default angular.module('app.payment', [
  'ui.router',
  'ngFileUpload',
  uiSelect,
  modal,
  pagination,
  smModalDialog,
  paymentService,
  apartmentService,
  invoiceService,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective
])
  .config(routing)
  .controller('PaymentController', PaymentController)
  .controller('PaymentCreateController', PaymentCreateController)
  .controller('PaymentUpdateController', PaymentUpdateController)
  .name;