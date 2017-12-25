import angular from 'angular';
import APP from "../../config/constants.js";

class ResidentService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_RESIDENT + 'get-all-active');
    }

    getById(id) {
        return this.$http.get(APP.API_RESIDENT + id);
    };

    search(data) {
        return this.$http.get(APP.API_RESIDENT, {
            params: data
        });
    };

    downloadTemplate() {
        return this.$http.get(APP.API_RESIDENT + "downloadTemplate");
    };
    create(data) {
        return this.$http.post(APP.API_RESIDENT, data);
    };

    update(data) {
        return this.$http.put(APP.API_RESIDENT, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_RESIDENT + data.residentId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_RESIDENT + 'multi', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    addApartment(residentId, data) {
        return this.$http.post(APP.API_RESIDENT + 'add-apartment/' + residentId, data);
    };

    removeApartment(residentId, apartmentId) {
        return this.$http.delete(APP.API_RESIDENT + 'remove-apartment/' + residentId + '/' + apartmentId);
    };

    

}

ResidentService.$inject = ['$http'];

export default angular.module('app.services.resident', [])
    .service('residentService', ResidentService)
    .name;