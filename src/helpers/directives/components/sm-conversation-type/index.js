import angular from 'angular';

const values = [
    { value: "REPORT_DIEN", title: "LABEL.CONVERSATION_TYPE.POWER_SUPPLY" },
    { value: "REPORT_NUOC", title: "LABEL.CONVERSATION_TYPE.WATER" },
    { value: "REPORT_ANNINH", title: "LABEL.CONVERSATION_TYPE.SECURITY" },
    { value: "REPORT_SUACHUA", title: "LABEL.CONVERSATION_TYPE.REPAIRING" }
]

class ResidentType {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            conversationType: '=ngModel',
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

        scope.conversationTypeValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.conversationTypeValue = found.title;
            }
        });
    }
}

export default ResidentType;