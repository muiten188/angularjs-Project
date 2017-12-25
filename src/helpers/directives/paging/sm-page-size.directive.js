import angular from 'angular';

function smPageSize() {
    return {
        template: require('./sm-page-size.html'),
        require: 'ngModel',
        scope: {
            pageSize: '=ngModel'
        }
    };
}

export default angular.module('app.directives.smPageSize', [])
    .directive('smPageSize', smPageSize)
    .name;