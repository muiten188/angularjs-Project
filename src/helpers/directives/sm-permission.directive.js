import angular from 'angular';

function smPermission() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller, transcludeFn) {
            console.log(scope, element, attrs);
        }
    };
}

export default angular.module('app.directives.permission', [])
    .directive('smPermission', smPermission)
    .name;