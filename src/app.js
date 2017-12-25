import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'admin-lte/dist/css/AdminLTE.css';
import 'admin-lte/dist/css/skins/skin-blue.min.css';
import 'angular-toastr/dist/angular-toastr.css';
import 'angular-loading-bar/src/loading-bar.css';

import './assert/app.css';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'admin-lte/dist/js/adminlte.js';

import angular from 'angular';
import '@uirouter/angularjs';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import toastr from 'angular-toastr';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-loading-bar/src/loading-bar.js'; 

import factories from './helpers/factories';

import appRoutes from './config/app.route';
import appI18n from './config/app.i18n';
import appHttp from './config/app.http';
import appHeader from './layout/header';
import appMenu from './layout/menu';

import test from './modules/test';
import home from './modules/home';
import user from './modules/user';
import building from './modules/building';
import apartment from './modules/apartment';
import group from './modules/group';
import staff from './modules/staff';
import resident from './modules/resident';
import roleGroup from './modules/role-group';
import requestChange from './modules/request-change';

//WEEK 2
import template from './modules/template';
import conversation from './modules/conversation';
import info from './modules/info'
import service from './modules/service'
import serviceRegistration from './modules/service-registration'
import apartmentMessage from './modules/apartment-message'
import dataInput from './modules/data-input'
import importData from './modules/import-data'
import requestUpdate from './modules/request-update';
import invoice from './modules/invoice';
import payment from './modules/payment';

import contextValueService from './helpers/services/context-value.service.js';

import smImage from './helpers/directives/sm-image.directive';

angular.module('app', [
  'ui.router',
  'pascalprecht.translate',
  'angular-loading-bar', 
  ngAnimate,
  ngMessages, 
  toastr,
  factories,
  appHeader,
  appMenu,
  home,
  test,
  user,
  building,
  apartment,
  group,
  staff,
  resident,
  info,
  service,
  dataInput,
  importData,
  roleGroup,
  requestChange,
  template,
  conversation,
  service,
  serviceRegistration,
  apartmentMessage,
  invoice,
  payment,
  contextValueService,
  smImage,
  requestUpdate
])
  .config(appRoutes)
  .config(appI18n)
  .config(appHttp)
  .run(['$window', 'contextValueService', function ($window, contextValueService) {
    if (!contextValueService.getStorage("userContext")) {
      $window.location.href = './login.html';
    }
  }]);