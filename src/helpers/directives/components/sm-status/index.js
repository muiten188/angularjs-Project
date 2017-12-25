import angular from 'angular';

const values = [
    { value: "ACTIVE", title: "LABEL.COMMON.ACTIVE" },
    { value: "INACTIVE", title: "LABEL.COMMON.INACTIVE" },
]

class Status {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            status: '=ngModel',
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

        scope.statusValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.statusValue = found.title;
            }
        });
    }
}

export default Status;