import angular from 'angular';

const values = [
    { value: "ADMIN", title: "LABEL.SERVICE_TYPE.ADMIN" },
    { value: "SYSTEM", title: "LABEL.SERVICE_TYPE.SYSTEM" },
]

class ServiceType {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            serviceType: '=ngModel',
            smClass: '@',
            smRequired: '@',
            smPlaceHolder: '@',
            smReadonly: '@ngReadonly',
            smInput: '@',
            ngValue: "<"
        };
        this.template = require('./index.html');
    }

    link(scope, elem, attrs) {
        scope.options = values;

        scope.serviceTypeValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.serviceTypeValue = found.title;
            }
        });
    }
}

export default ServiceType;