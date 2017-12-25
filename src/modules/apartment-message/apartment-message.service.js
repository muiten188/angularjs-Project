import angular from 'angular';
import APP from "../../config/constants.js";

class ApartmentMessageService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_APARTMENT_MESSAGE + 'all');
    }

    getById(id) {
        return this.$http.get(APP.API_APARTMENT_MESSAGE+"get/" + id);
    };

    search(data) {
        return this.$http.get(APP.API_APARTMENT_MESSAGE, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_APARTMENT_MESSAGE+"/save", data);
    };

    update(data) {
        return this.$http.post(APP.API_APARTMENT_MESSAGE+"update", data);
    };

    delete(data) {
        return this.$http.delete(APP.API_APARTMENT_MESSAGE+"delete/" + data.messageId);
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_APARTMENT_MESSAGE + 'delete/multiple', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

ApartmentMessageService.$inject = ['$http'];

export default angular.module('app.services.apartmentMessage', [])
    .service('apartmentMessageService', ApartmentMessageService)
    .name;