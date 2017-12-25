import angular from 'angular';
import MenuController from './menu.controllers';
import APP_MENU from '../../config/app.menu';

const appMenu = {
	template: require('./menu.html'),
	controller: 'MenuController',
	controllerAs: 'ctrl'
}

export default angular.module('app.menu', [])
	.controller('MenuController', MenuController)
	.component('appMenu', appMenu)
	.name;