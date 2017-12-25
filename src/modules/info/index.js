import angular from 'angular';
import '@uirouter/angularjs';
import modal from 'angular-ui-bootstrap/src/modal';
import pagination from 'angular-ui-bootstrap/src/pagination';
import 'jquery-slimscroll';

import routing from './info.routes';
import toNumberDirective from '../../helpers/directives/to-number.directive';
import smModalDialog from '../../helpers/directives/modal/modal.directive';
import stTableDirective from '../../helpers/directives/table/st-table.directive';
import sortByDirective from '../../helpers/directives/table/sort-by.directive';
import smRecords from '../../helpers/directives/paging/sm-records.directive';
import smPageSize from '../../helpers/directives/paging/sm-page-size.directive';

import localeToastrService from '../../helpers/services/locale-toastr.service';
import confirmDialog from '../../helpers/services/confirm/confirm.service';
import fileInput from '../../helpers/directives/file-input/file-input.directive';
import {InfoController, InfoUpdateController, InfoCreateController} from './info.controllers';
import infoService from './info.service'


export default angular.module('app.info', ['ui.router',
  infoService,
  confirmDialog,
  localeToastrService ,
  modal,
  pagination,
  smModalDialog,
  localeToastrService,
  confirmDialog,
  stTableDirective,
  sortByDirective,
  smRecords,
  smPageSize,
  toNumberDirective,
  fileInput
  ])
  .config(routing)
  .controller('InfoController', InfoController)
  .controller('InfoUpdateController',InfoUpdateController)
  .controller('InfoCreateController',InfoCreateController)
  .name;
  

