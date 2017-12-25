import angular from 'angular';

function smModalDialog() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: require('./modal.html'),
		scope: {
			modalTitle: '@',
			type: '@'
		},
		link: function (scope, element) {
			scope.close = function () {
				scope.$parent.$dismiss('close');
			};
		}
	};
}

export default angular.module('app.directives.modal', [])
	.directive('smModalDialog', smModalDialog)
	.name;