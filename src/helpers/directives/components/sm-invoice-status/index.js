import angular from 'angular';

const values = [
    { value: "UNPUBLISHED", title: "LABEL.INVOICE_STATUS.UNPUBLISHED" },
    { value: "INCOMPLETE", title: "LABEL.INVOICE_STATUS.INCOMPLETE" },
    { value: "COMPLETE", title: "LABEL.INVOICE_STATUS.COMPLETE" }
]

class InvoiceStatus {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            invoiceStatus: '=ngModel',
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
        scope.invoiceStatusValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.invoiceStatusValue = found.title;
            }
        });
    }
}

export default InvoiceStatus;