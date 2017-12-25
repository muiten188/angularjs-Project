import angular from 'angular';
import APP from "../../config/constants.js";

class ServiceRegistrationService {
    constructor($http) {
        this.$http = $http;
    }

    getById(id) {
        return this.$http.get(APP.API_SERVICE_REGISTRATION + id + "/id");
    };

    search(data) {
        return this.$http.get(APP.API_SERVICE_REGISTRATION, {
            params: data
        });
    };

    searchByText(data) {
        return this.$http.get(APP.API_SERVICE_REGISTRATION + "search", {
            params: data
        });
    };

    getRequestServiceDetail(id) {
        return this.$http.get(APP.API_SERVICE_REGISTRATION +id);
    };

    findByFloorId(floorId){
        return this.$http.get(APP.API_SERVICE_REGISTRATION + "findByFloorId/" + floorId);
    }

    findByGroupId(groupId) {
        return this.$http.get(APP.API_SERVICE_REGISTRATION + "findByGroupId/" + groupId);
    };
    
    findByResidentId(residentId) {
        return this.$http.get(APP.API_SERVICE_REGISTRATION + "findByResidentId/" + residentId);
    };

    create(data) {
        return this.$http.post(APP.API_SERVICE_REGISTRATION, data);
    };

    update(data) {
        return this.$http.put(APP.API_SERVICE_REGISTRATION, data);
    };

    approve(data){
        return this.$http.post(APP.API_SERVICE_REGISTRATION+"accept", data);
    }

    reject(data){
        return this.$http.post(APP.API_SERVICE_REGISTRATION+"reject", data);
    }

    delete(data) {
        return this.$http.delete(APP.API_SERVICE_REGISTRATION + 'delete/'+ data.serviceRequestId );
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_SERVICE_REGISTRATION + 'multi-delete/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    deleteFileAttachment(uploadId){
        return this.$http.delete(APP.API_SERVICE_REGISTRATION + 'delete-file-attachment/?uploadId='+uploadId);
    }

}

ServiceRegistrationService.$inject = ['$http'];

export default angular.module('app.services.serviceRegistration', [])
    .service('serviceRegistrationService', ServiceRegistrationService)
    .name;