import angular from 'angular';

class Gender {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            gender: '=ngModel',
            smClass: '@ngClass',
            smRequired: '@ngRequired',
            smReadonly: '@ngReadonly',
            smInput: '@',
            ngValue: "<"
        };
        this.template = require('./index.html');
    }

    link(scope, elem, attrs) {
        scope.genderValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            scope.genderValue = newValue === 'MALE' ? 'LABEL.COMMON.MALE'
                : (newValue === 'FEMALE' ? 'LABEL.COMMON.FEMALE' : '');
        });
    }
}

export default Gender;

