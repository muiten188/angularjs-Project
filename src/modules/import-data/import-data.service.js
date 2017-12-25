import angular from 'angular';
import APP from "../../config/constants.js";
import 'ng-file-upload';

class ImportDataService {
    constructor($http,Upload) {
        this.$http = $http;
        this.Upload=Upload;
    }

    downloadTemplate(fileTemplateType) {
        return this.$http.get(APP.API_DATA_IMPORT + "?fileTemplateType="+fileTemplateType);
    };

    importDataInput(file, serviceType) {
        return this.Upload.upload({
            url: APP.API_DATA_IMPORT + '?fileTemplateType='+serviceType,
            data: {
                dataFile: file
            }
        })
    };
}

ImportDataService.$inject = ['$http','Upload'];

export default angular.module('app.services.importData', ['ngFileUpload'])
    .service('importDataService', ImportDataService)
    .name;