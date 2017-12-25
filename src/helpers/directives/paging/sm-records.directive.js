import angular from 'angular';

function smRecords() {
    return {
        template: require('./sm-record.html'),
        scope: {
            count: '<'
        },
        link: function (scope, element, attrs, ngModel) {
            scope.$watch('count', function (value) {
                scope.trRecordsData = { count: scope.count };
            });
        }
    };
}

export default angular.module('app.directives.smRecords', [])
    .directive('smRecords', smRecords)
    .name;