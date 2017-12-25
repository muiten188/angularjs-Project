import angular from 'angular';

function sortBy($rootScope) {

	function getDirection(directionIndex) {
		if (directionIndex == 1)
			return ",asc";

		if (directionIndex == 2)
			return ",desc";

		return "";
	}

	return {
		restrict: 'A',
		require: '^stTable',
		transclude: true,
		replace: true,
		template: '<th><a href ng-transclude></a>\
				<i class="fa fa-sort pull-right" style="padding-top: 0.2em" ng-if="direction === 0"></i>\
				<i class="fa fa-sort-asc pull-right" style="padding-top: 0.2em" ng-if="direction === 1"></i>\
				<i class="fa fa-sort-desc pull-right" style="padding-top: 0.2em" ng-if="direction === 2"></i>\
				</th>',
		scope: true,
		link: function (scope, element, attrs, pctrl, transcludeFn) {
			scope.direction = 0;
			element.css({
				'cursor': 'pointer'
			});
			element.on('click', () => {
				scope.direction = ++scope.direction >= 3 ? scope.direction - 3 : scope.direction;

				scope.$apply(function () {
					pctrl.sort = attrs.sortBy + getDirection(scope.direction);

					$rootScope.$broadcast('resetSorting', {
						keep: attrs.sortBy
					});
				});

			});

			scope.$on('resetSorting', function (event, data) {
				if (data && data.keep != attrs.sortBy) {
					scope.direction = 0;
					scope.sort = '';
				}
			});
		}
	};
}

sortBy.$inject = ['$rootScope'];

export default angular.module('app.directives.sortBy', [])
	.directive('sortBy', sortBy)
	.name;