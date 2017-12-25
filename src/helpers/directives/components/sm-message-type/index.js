import angular from 'angular';

const values = [
    { value: "GENERAL", title: "LABEL.MESSAGE_TYPE.GENERAL" },
    { value: "INDIVIDUAL", title: "LABEL.MESSAGE_TYPE.INDIVIDUAL" }
]

class MessageType {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            messageType: '=ngModel',
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

        scope.messageTypeValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.messageTypeValue = found.title;
            }
        });
    }
}

export default MessageType;