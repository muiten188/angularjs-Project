import angular from 'angular';

const values = [
    { value: "NOIQUYCHUNG", title: "LABEL.REGULATION_SUBCATEGORY.NOIQUYCHUNG" },
    { value: "NOIQUYANNINH", title: "LABEL.REGULATION_SUBCATEGORY.NOIQUYANNINH" },
    { value: "NOIQUYTAICHINH", title: "LABEL.REGULATION_SUBCATEGORY.NOIQUYTAICHINH" },
    { value: "DICHVUDIEN", title: "LABEL.REGULATION_SUBCATEGORY.DICHVUDIEN" },
    { value: "DICHVUNUOC", title: "LABEL.REGULATION_SUBCATEGORY.DICHVUNUOC" },
    { value: "DICHVUTOANHA", title: "LABEL.REGULATION_SUBCATEGORY.DICHVUTOANHA" },
    { value: "DICHVUXADAP", title: "LABEL.REGULATION_SUBCATEGORY.DICHVUXADAP" },
    { value: "DICHVUXAMAY", title: "LABEL.REGULATION_SUBCATEGORY.DICHVUXAMAY" },
    { value: "DICHVUOTO", title: "LABEL.REGULATION_SUBCATEGORY.DICHVUOTO" }
]

class RegulationSubCategory {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            regulationSubCategory: '=ngModel',
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

        scope.regulationSubCategoryValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.regulationSubCategoryValue = found.title;
            }
        });
    }
}

export default RegulationSubCategory;