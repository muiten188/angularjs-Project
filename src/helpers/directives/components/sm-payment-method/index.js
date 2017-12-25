import angular from 'angular';

const values = [
    { value: "CASH", title: "LABEL.PAYMENT_METHOD.CASH" },
    { value: "BANK_TRANSFER", title: "LABEL.PAYMENT_METHOD.BANK_TRANSFER" },
]

class PaymentMethod {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            paymentMethod: '=ngModel',
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

        scope.paymentMethodValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.paymentMethodValue = found.title;
            }
        });
    }
}

export default PaymentMethod;