import angular from 'angular';
import APP from "../../config/constants.js";

class RequestChangeService {
    constructor($http) {
        this.$http = $http;
    }

    search(data) {
        return this.$http.get(APP.API_REQUEST_CHANGE, {
            params: data
        });
    };

    getNewById(id) {
        return this.$http.get(APP.API_REQUEST_CHANGE + "/new/" + id);
    };

    getChangeById(id) {
        return this.$http.get(APP.API_REQUEST_CHANGE + "/change/" + id);
    };

    acceptNew(data) {
        return this.$http.post(APP.API_REQUEST_CHANGE + "/new/accept", data);
    };

    acceptChange(data) {
        return this.$http.get(APP.API_REQUEST_CHANGE + "/change/accept", data);
    };

    rejectRequest(data) {
        return this.$http.get(APP.API_REQUEST_CHANGE + "/reject", data);
    };

}

RequestChangeService.$inject = ['$http'];

export default angular.module('app.services.requestChange', [])
    .service('requestChangeService', RequestChangeService)
    .name;