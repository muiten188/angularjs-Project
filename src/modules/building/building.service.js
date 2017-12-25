import angular from 'angular';
import APP from "../../config/constants.js";

class BuildingService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_BUILDING + 'get-all-active');
    }

    getById(id) {
        return this.$http.get(APP.API_BUILDING + id + "/id");
    };

    search(data) {
        return this.$http.get(APP.API_BUILDING, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_BUILDING, data);
    };

    update(data) {
        return this.$http.put(APP.API_BUILDING, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_BUILDING + data.buildingId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_BUILDING + 'multil/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

BuildingService.$inject = ['$http'];

export default angular.module('app.services.building', [])
    .service('buildingService', BuildingService)
    .name;