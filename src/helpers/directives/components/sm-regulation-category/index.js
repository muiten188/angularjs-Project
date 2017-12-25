import angular from 'angular';

const values = [
    { value: "REGULATION", title: "LABEL.REGULATION_CATEGORY.REGULATION" },
    { value: "BASE_SERVICE", title: "LABEL.REGULATION_CATEGORY.BASE_SERVICE" },
    { value: "OPTION_SERVICE", title: "LABEL.REGULATION_CATEGORY.OPTION_SERVICE" }
]

class RegulationCategory {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            regulationCategory: '=ngModel',
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

        scope.regulationCategoryValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.regulationCategoryValue = found.title;
            }
        });
    }
}

export default RegulationCategory;