import angular from 'angular';
import APP from "../../config/constants.js";

class DataInputService {
    constructor($http) {
        this.$http = $http;
    }
    update(data) {
        return this.$http.put(APP.API_DATA_INPUT, data);
    };
    search(data) {
        return this.$http.get(APP.API_DATA_INPUT, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_DATA_INPUT, data);
    };

    delete(data,keyId) {
        return this.$http.delete(APP.API_DATA_INPUT + + data[keyId] +'/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_DATA_INPUT + 'multi-delete/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
}

DataInputService.$inject = ['$http'];

export default angular.module('app.services.dataInput', [])
    .service('dataInputService', DataInputService)
    .name;