import angular from 'angular';

function toNumber() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                return val ? '' + val : val;
            });
        }
    };
}

export default angular.module('app.directives.toNumber', [])
    .directive('toNumber', toNumber)
    .name;