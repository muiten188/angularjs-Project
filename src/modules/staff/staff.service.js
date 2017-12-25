import angular from 'angular';
import APP from "../../config/constants.js";

class StaffService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_STAFF + 'get-all-active');
    }

    getById(id) {
        return this.$http.get(APP.API_STAFF + id);
    };

    search(data) {
        return this.$http.get(APP.API_STAFF, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_STAFF, data);
    };

    update(data) {
        return this.$http.put(APP.API_STAFF, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_STAFF + data.residentId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_STAFF + 'multi', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

StaffService.$inject = ['$http'];

export default angular.module('app.services.staff', [])
    .service('staffService', StaffService)
    .name;