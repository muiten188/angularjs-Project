import angular from 'angular';
import APP from "../../config/constants.js";

class InfoService {
    constructor($http) {
        this.$http = $http;
    }

    getById(id) {
        return this.$http.get(APP.API_INFO + id + "/id");
    };

    search(data) {
        return this.$http.get(APP.API_INFO, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_INFO, data);
    };

    update(data) {
        return this.$http.put(APP.API_INFO, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_INFO + data.regulationId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_INFO + 'multil/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

InfoService.$inject = ['$http'];

export default angular.module('app.services.info', [])
    .service('infoService', InfoService)
    .name;