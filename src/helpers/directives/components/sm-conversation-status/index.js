import angular from 'angular';

const values = [
    { value: "NEW", title: "LABEL.CONVERSATION_STATUS.NEW" },
    { value: "ACCEPT", title: "LABEL.CONVERSATION_STATUS.ACCEPT" },
    { value: "DONE", title: "LABEL.CONVERSATION_STATUS.DONE" },
]
class ResidentType {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            conversationStatus: '=ngModel',
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

        scope.conversationStatusValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.conversationStatusValue = found.title;
            }
        });
    }
}

export default ResidentType;