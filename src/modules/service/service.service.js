import angular from 'angular';
import APP from "../../config/constants.js";

class ServiceService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_SERVICE + 'get-all-active');
    }

    getById(id) {
        return this.$http.get(APP.API_SERVICE + id + "/id");
    };

    getAllTariff(id) {
        return this.$http.get(APP.API_SERVICE + id + "/tariffs/");
    }

    search(data) {
        return this.$http.get(APP.API_SERVICE, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_SERVICE, data);
    };

    update(data) {
        return this.$http.put(APP.API_SERVICE, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_SERVICE + data.serviceId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_SERVICE + 'multil/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

ServiceService.$inject = ['$http'];

export default angular.module('app.services.service', [])
    .service('serviceService', ServiceService)
    .name;