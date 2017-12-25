import angular from 'angular';

function toString() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            // ngModel.$parsers.push(function (val) {
            //     return parseInt(val, 10);
            // });
            ngModel.$formatters.push(function (val) {
                return val ? '' + val : val;
            });
        }
    };
}

export default angular.module('app.directives.toString', [])
    .directive('toString', toString)
    .name;