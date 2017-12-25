import angular from 'angular';
import APP from "../../config/constants.js";

class StaffService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_REQUEST_CHANGE + 'get-all-active');
    }

    getById(id) {
        return this.$http.get(APP.API_REQUEST_CHANGE + id);
    };

    search(data) {
        return this.$http.get(APP.API_REQUEST_CHANGE, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_REQUEST_CHANGE, data);
    };

    update(data) {
        return this.$http.put(APP.API_REQUEST_CHANGE, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_REQUEST_CHANGE + data.residentId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_REQUEST_CHANGE + 'multi', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

StaffService.$inject = ['$http'];

export default angular.module('app.services.request-update', [])
    .service('requestUpdateService', StaffService)
    .name;