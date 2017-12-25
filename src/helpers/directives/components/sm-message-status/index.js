import angular from 'angular';

const values = [
    { value: "PRE_SEND", title: "LABEL.MESSAGE_STATUS.PRE_SEND" },
    { value: "SENDED", title: "LABEL.MESSAGE_STATUS.SENDED" },
    { value: "READED", title: "LABEL.MESSAGE_STATUS.READED" },
    { value: "PRE_USE_APP", title: "LABEL.MESSAGE_STATUS.PRE_USE_APP" }
]

class MessageStatus {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            messageStatus: '=ngModel',
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

        scope.messageStatusValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.messageStatusValue = found.title;
            }
        });
    }
}

export default MessageStatus;