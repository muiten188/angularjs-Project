import angular from 'angular';

function fileInput($rootScope,$parse){
    function toArray(fileList) {
        return Array.prototype.slice.call(fileList);
    }
    return {
        restrict: 'A',
        scope:{fileInput:'=fileInput',fileInputChange:'&fileInputChange'},
        link: function (scope, element, attributes) {
            element.bind('change', ()=> {
                scope.fileInput=scope.fileInput||[];
                for (var i = 0; i < element[0].files.length; i++) {
                    var file = element[0].files[i];
                    scope.fileInput.push(file); 
                };
                // !scope.fileInput||scope.fileInput.length==0?
                // scope.fileInput=element[0].files:
                // scope.fileInput=toArray(scope.fileInput).concat(toArray(element[0].files));
                scope.$apply()
                scope.fileInputChange()
            });
        }
    };
}

fileInput.$inject = ['$rootScope','$parse'];

export default angular.module('app.directives.fileInput', [])
	.directive('fileInput', fileInput)
	.name;