import angular from 'angular';
import APP from "../../config/constants.js";

class FloorService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_FLOOR + 'all');
    }

    getById(id) {
        return this.$http.get(APP.API_FLOOR + id + "/id");
    };

    findByBuildingId(buildingId) {
        return this.$http.get(APP.API_FLOOR + 'findByBuildingId/' + buildingId);
    }

    search(data) {
        return this.$http.get(APP.API_FLOOR, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_FLOOR, data);
    };

    update(data) {
        return this.$http.put(APP.API_FLOOR, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_FLOOR + data.floorId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_FLOOR + 'multil/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

FloorService.$inject = ['$http'];

export default angular.module('app.services.floor', [])
    .service('floorService', FloorService)
    .name;