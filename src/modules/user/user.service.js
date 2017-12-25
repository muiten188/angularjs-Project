import angular from 'angular';
import APP from "../../config/constants.js";

class UserService {
    constructor($http) {
        this.$http = $http;
    }

    getById(id) {
        return this.$http.get(APP.API_USER + id + "/id");
    };

    search(data) {
        return this.$http.get(APP.API_USER, {
            params: data
        });
    };

    login(data) {
        return this.$http.post(APP.API_USER_LOGIN, data);
    };

    forgetPassword(data) {
        return this.$http.get("/data/user.login.json", data);
    };
}

UserService.$inject = ['$http'];

export default angular.module('app.services.user', [])
    .service('userService', UserService)
    .name;