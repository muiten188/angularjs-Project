import angular from 'angular';
import '@uirouter/angularjs';
import vcRecaptcha from 'angular-recaptcha';

import loginRoutes from './login.routes';
import controllers from './login.controllers.js';

import contextValueService from '../../helpers/services/context-value.service.js';
import localeToastrService from '../../helpers/services/locale-toastr.service.js';
import confirmDialog from '../../helpers/services/confirm/confirm.service.js';
import userService from '../user/user.service.js';

export default angular.module('login.login', [
    'ui.router',
    vcRecaptcha,
    userService,
    contextValueService,
    localeToastrService,
    confirmDialog
  ])
  .config(loginRoutes)
  .controller('LoginController', controllers.LoginController)
  .controller('ForgetPasswordController', controllers.ForgetPasswordController)
  .name;