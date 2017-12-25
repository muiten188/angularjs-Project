import angular from 'angular';
import APP from "../../config/constants.js";

class ApartmentService {
    constructor($http) {
        this.$http = $http;
    }

    getById(id) {
        return this.$http.get(APP.API_APARTMENT + id);
    };

    search(data) {
        return this.$http.get(APP.API_APARTMENT, {
            params: data
        });
    };

    searchByText(data) {
        return this.$http.get(APP.API_APARTMENT + "search", {
            params: data
        });
    };

    findByFloorId(floorId){
        return this.$http.get(APP.API_APARTMENT + "findByFloorId/" + floorId);
    }

    findByGroupId(groupId) {
        return this.$http.get(APP.API_APARTMENT + "findByGroupId/" + groupId);
    };
    
    findByResidentId(residentId) {
        return this.$http.get(APP.API_APARTMENT + "findByResidentId/" + residentId);
    };

    create(data) {
        return this.$http.post(APP.API_APARTMENT, data);
    };

    update(data) {
        return this.$http.put(APP.API_APARTMENT, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_APARTMENT + data.apartmentId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_APARTMENT + 'multil/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

ApartmentService.$inject = ['$http'];

export default angular.module('app.services.apartment', [])
    .service('apartmentService', ApartmentService)
    .name;