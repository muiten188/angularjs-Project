import angular from 'angular';
import APP from "../../config/constants.js";

class TariffService {
    constructor($http) {
        this.$http = $http;
    }

    getAll() {
        return this.$http.get(APP.API_TARIFF + 'get-all-active');
    }

    create(data) {
        return this.$http.post(APP.API_TARIFF, data);
    };

    update(data) {
        return this.$http.put(APP.API_TARIFF, data);
    };

    delete(data) {
        return this.$http.delete(APP.API_TARIFF + data.tariffId + '/id');
    };

    findByServiceId(serviceId){
        return this.$http.post(APP.API_TARIFF +"findByServiceId/"+serviceId );
    }

    findByServiceType(serviceType){
        return this.$http.get(APP.API_TARIFF +"findByServiceType/"+serviceType );
    }

}

TariffService.$inject = ['$http'];

export default angular.module('app.services.tariff', [])
    .service('tariffService', TariffService)
    .name;