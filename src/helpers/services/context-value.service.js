import angular from 'angular';
import ngCookies from 'angular-cookies';

class ContextValueService {
    
    constructor($cookies) {
        this.$cookies = $cookies;
    }

    get(key) {
        let value = this.getStorage(key);
        return value ? value : this.getCookies(key);
    }

    getCookies(key) {
        return this.$cookies.get(key);
    }

    setCookies(key, value, path, expires) {
        path = path ? path : "/";
        expires = expires ? expires : "0";
        this.$cookies.put(key, value, {
            path: path,
            expires: expires
        });
    }

    removeCookie(key) {
        this.$cookies.remove(key);
    }

    getStorage(key) {
        return localStorage.getItem(key);
    }

    setStorage(key, value) {
        localStorage.setItem(key, value);
    }

    removeStorage(key) {
        localStorage.removeItem(key);
    }

    clearStorage(key) {
        localStorage.clear();
    }

}

ContextValueService.$inject = ['$cookies'];

export default angular.module('app.services.contextValue', [ngCookies])
    .service('contextValueService', ContextValueService)
    .name;