import angular from 'angular';

const values = [
    { value: "ADMIN", title: "LABEL.TEMPLATE_GROUP.ADMIN" },
    { value: "SYSTEM", title: "LABEL.TEMPLATE_GROUP.SYSTEM" }
]

class TemplateGroup {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            templateGroup: '=ngModel',
            smClass: '@',
            smRequired: '@',
            smPlaceHolder: '@',
            smReadonly: '@ngReadonly',
            smDisabled: '@ngDisabled',
            smInput: '@',
            ngValue: "<"
        };
        this.template = require('./index.html');
    }

    link(scope, elem, attrs) {
        scope.options = values;

        scope.templateGroupValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.templateGroupValue = found.title;
            }
        });
    }
}

export default TemplateGroup;