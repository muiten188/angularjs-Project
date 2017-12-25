import angular from 'angular';
import contextValueService from '../services/context-value.service.js';

function contextValue(contextValueService) {
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			key: '@',
			sub: '@',
		},
		link: function (scope, element) {
			let value = contextValueService.get(scope.key);
			element.text(value && scope.sub ? angular.fromJson(value)[scope.sub] : value);
		}
	};
}

contextValue.$inject = ['contextValueService'];

export default angular.module('app.directives.contextValue', [contextValueService])
	.directive('contextValue', contextValue)
	.name;