import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'admin-lte/dist/css/AdminLTE.css';
import 'admin-lte/dist/css/skins/skin-blue.min.css';
import 'angular-toastr/dist/angular-toastr.css';

import './assert/login.css';

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

import appI18n from './config/app.i18n';
import loginRoutes from './config/login.route';

import login from './modules/login';

angular.module('login', [
    'ui.router',
    'pascalprecht.translate',
    ngAnimate,
    ngMessages,
    toastr,
    login
])
.config(appI18n)
.config(loginRoutes);