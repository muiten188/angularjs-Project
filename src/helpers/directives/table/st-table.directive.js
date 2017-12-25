import angular from 'angular';

function stTable() {
	return {
		restrict: 'A',
		scope: {
			stClick: "&stClick"
		},
		controller: ['$scope', function ($scope) {
			var self = this;
			self.sort = "";
			$scope.$watch(function () {
				return self.sort;
			}, function (newValue, oldValue) {
				if (newValue !== oldValue) {
					$scope.stClick({
						paging: {
							sort: newValue
						}
					});
				}
			});
		}]
	};
}

export default angular.module('app.directives.stTable', [])
	.directive('stTable', stTable)
	.name;