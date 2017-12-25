import angular from 'angular';
import APP from "../../config/constants.js";

class InvoiceService {
    constructor($http) {
        this.$http = $http;
    }

    getById(id) {
        return this.$http.get(APP.API_INVOICE + 'detail/' + id);
    };

    getInvoiceCode(apartmentId, month) {
        return this.$http.get(APP.API_INVOICE + 'getInvoiceId', {
            params: {
                apartmentId: apartmentId,
                month: month
            }
        });
    };

    search(data) {
        return this.$http.get(APP.API_INVOICE, {
            params: data
        });
    };

    searchByText(data) {
        return this.$http.get(APP.API_INVOICE + "search", {
            params: data
        });
    };

    generateInvoice(data) {
        return this.$http.post(APP.API_INVOICE, data);
    };

    updateInvoice(id) {
        return this.$http.put(APP.API_INVOICE + id + '/update');
    };

    updateMultiInvoice(data) {
        return this.$http.put(APP.API_INVOICE + 'multi-update', data);
    };

    publishMultiInvoice(data) {
        return this.$http.post(APP.API_INVOICE + 'publish', data);
    };

    getItemToPayment(invoiceId) {
        return this.$http.get(APP.API_INVOICE + 'getItemToPayment', {
            params: {
                invoiceId: invoiceId
            }
        });
    };

}

InvoiceService.$inject = ['$http'];

export default angular.module('app.services.invoice', [])
    .service('invoiceService', InvoiceService)
    .name;