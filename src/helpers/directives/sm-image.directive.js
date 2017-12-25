import angular from 'angular';
import APP from "../../config/constants.js";
function smImage() {
    return {
        restrict: 'E',
        scope: {
            imgPath: '@',
            imgStyle: '@'
        },
        template: '<img ng-src="{{imgSrc}}" style="{{imgStyle}}" />',
        link: function (scope, element, attrs, controller, transcludeFn) {
            scope.$watch('imgPath', function (value) {
                scope.imgSrc = APP.MEDIA_SERVER + (value && value[0] === '/' ? '' : '/') + value;
            });
        }
    };
}

export default angular.module('app.directives.smImage', [])
    .directive('smImage', smImage)
    .name;