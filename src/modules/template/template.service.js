import angular from 'angular';
import APP from "../../config/constants.js";

class TemplateService {
    constructor($http) {
        this.$http = $http;
    }

    getById(id) {
        return this.$http.get(APP.API_TEMPLATE + id);
    };
    
    getAllActive() {
        return this.$http.get(APP.API_TEMPLATE + "get-all-active");
    };

    search(data) {
        return this.$http.get(APP.API_TEMPLATE, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_TEMPLATE, data);
    };

    update(data) {
        return this.$http.put(APP.API_TEMPLATE, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_TEMPLATE + data.templateId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_TEMPLATE + 'multi-delete', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

TemplateService.$inject = ['$http'];

export default angular.module('app.services.template', [])
    .service('templateService', TemplateService)
    .name;