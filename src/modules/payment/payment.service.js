import angular from 'angular';
import APP from "../../config/constants.js";

class PaymentService {
    constructor($http) {
        this.$http = $http;
    }

    getById(id) {
        return this.$http.get(APP.API_PAYMENT + id);
    };

    search(data) {
        return this.$http.get(APP.API_PAYMENT, {
            params: data
        });
    };

    pay(data) {
        return this.$http.post(APP.API_PAYMENT + 'pay', data);
    };

}

PaymentService.$inject = ['$http'];

export default angular.module('app.services.payment', [])
    .service('paymentService', PaymentService)
    .name;