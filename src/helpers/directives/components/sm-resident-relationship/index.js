import angular from 'angular';

const values = [
    { value: "FATHER", title: "LABEL.RESIDENT_RELATIONSHIP.FATHER" },
    { value: "MOTHER", title: "LABEL.RESIDENT_RELATIONSHIP.MOTHER" },
    { value: "WIFE", title: "LABEL.RESIDENT_RELATIONSHIP.WIFE" },
    { value: "HUSBAND", title: "LABEL.RESIDENT_RELATIONSHIP.HUSBAND" },
    { value: "CHILD", title: "LABEL.RESIDENT_RELATIONSHIP.CHILD" },
    { value: "BROTHER", title: "LABEL.RESIDENT_RELATIONSHIP.BROTHER" },
    { value: "SISTER", title: "LABEL.RESIDENT_RELATIONSHIP.SISTER" }
]

class ResidentRelationship {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            relationship: '=ngModel',
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

        scope.relationShipValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.relationShipValue = found.title;
            }
        });
    }
}

export default ResidentRelationship;