import angular from 'angular';
import APP from "../../config/constants.js";

class RoleGroupService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_ROLE_GROUP + 'all');
    }

    getById(id) {
        return this.$http.get(APP.API_ROLE_GROUP + id);
    };

    search(data) {
        return this.$http.get(APP.API_ROLE_GROUP, {
            params: data
        });
    };

    create(data) {
        return this.$http.post(APP.API_ROLE_GROUP, data);
    };

    update(data) {
        return this.$http.put(APP.API_ROLE_GROUP, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_ROLE_GROUP + data.roleGroupId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_ROLE_GROUP + 'multi/', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

RoleGroupService.$inject = ['$http'];

export default angular.module('app.services.roleGroup', [])
    .service('roleGroupService', RoleGroupService)
    .name;