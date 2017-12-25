import angular from "angular";
import APP from "../../config/constants.js";
import "ng-file-upload";

class UploadService {
  constructor($http, Upload) {
    this.$http = $http;
    this.Upload = Upload;
  }

  uploadPlan(file) {
    return this.Upload.upload({
      url: APP.API_UPLOAD + "plan",
      data: {
        file: file
      }
    });
  }

  uploadStaff(file) {
    return this.Upload.upload({
      url: APP.API_UPLOAD + "staff",
      data: {
        file: file
      }
    });
  }

  uploadResident(file) {
    return this.Upload.upload({
      url: APP.API_UPLOAD + "resident",
      data: {
        file: file
      }
    });
  }

  uploadResidentFile(file) {
    return this.Upload.upload({
      url: APP.API_UPLOAD + "resident/file",
      data: {
        file: file
      }
    });
  }

  importResidentData(file) {
    return this.Upload.upload({
      url: APP.API_RESIDENT + "importResident",
      data: {
        file: file
      }
    });
  }

  importDataInput(file, serviceType) {
    return this.Upload.upload({
      url: APP.API_DATA_INPUT + "preview-data/?serviceType=" + serviceType,
      data: {
        dataFile: file
      }
      // url: APP.API_RESIDENT + 'importResident',
      // data: {
      //     file: file
      // }
    });
  }

  uploadFileServiceResgitaion(file, type) {
    return this.Upload.upload({
      url: APP.API_UPLOAD + "vehicle/registration",
      data: {
        file: file,
        vehicleDocType: type
      }
    });
  }

  findApartmentPlan(apartmentId) {
    return this.$http.get(APP.API_UPLOAD + "apartment/" + apartmentId);
  }

  uploadApartmentMessage(file) {
    return this.Upload.upload({
      url: APP.API_UPLOAD + "apartment-message",
      data: {
        file: file
      }
    });
  }
}

UploadService.$inject = ["$http", "Upload"];

export default angular
  .module("app.services.upload", ["ngFileUpload"])
  .service("uploadService", UploadService).name;
