import angular from 'angular';
import contextValue from '../../helpers/directives/context-value.directive';
import contextValueService from '../../helpers/services/context-value.service';
import {HeaderController, ChangePasswordController} from './header.controllers';
import SseFactory from "../../helpers/factories";
import userService from '../../modules/user/user.service';

const appHeader = {
	template: require('./view/header.html'),
	controller: 'HeaderController',
	controllerAs: 'ctrl'
};

export default angular.module('app.header', [SseFactory, contextValue, userService])
	.controller('HeaderController', HeaderController)
	.controller('ChangePasswordController', ChangePasswordController)
	.component('appHeader', appHeader)
	.name;