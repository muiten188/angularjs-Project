import angular from 'angular';
import APP from "../../config/constants.js";

class GroupService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_GROUP + 'all');
    }

    getById(id) {
        return this.$http.get(APP.API_GROUP + id + "/id");
    };

    search(data) {
        return this.$http.get(APP.API_GROUP, {
            params: data
        });
    };

    searchByText(data) {
        return this.$http.get(APP.API_GROUP + "search", {
            params: data
        });
    };

    findByApartmentId(apartmentId) {
        return this.$http.get(APP.API_GROUP + "findByApartmentId/" + apartmentId);
    };

    create(data) {
        return this.$http.post(APP.API_GROUP, data);
    };

    update(data) {
        return this.$http.put(APP.API_GROUP, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_GROUP + data.groupId + '/id');
    };

    deleteMulti(data) {
        return this.$http.delete(APP.API_GROUP + 'multi', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

}

GroupService.$inject = ['$http'];

export default angular.module('app.services.group', [])
    .service('groupService', GroupService)
    .name;