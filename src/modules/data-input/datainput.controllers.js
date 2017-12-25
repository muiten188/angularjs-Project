const ServiceType={
  Electric:"Điện",
  ElectricEN:"ELECTRIC",
  Water:"Nước",
  WaterEN:"WATER"
}
class DatainputController {
  constructor($uibModal, confirmDialog, localeToastrService, dataInputService) {
    let self = this;
    self.$uibModal = $uibModal;
    self.confirmDialog = confirmDialog;
    self.localeToastrService = localeToastrService;
    self.dataInputService = dataInputService;
    self.currentPage = 1;
    self.sort = "";
    //data to search
    self.data = {};
    self.data.pageSize = 20;

    self.datasource = {};

    self.isCheckAll = false;
    self.checkBoxes = [];

    self.onSearch();
  }

  onSearch(paging) {
    var self = this;
    paging = paging || {};
    self.data = self.data || {};
    self.data.currentPage = paging.pageIndex || self.currentPage || 1;
    self.data.sort = paging.sort || self.sort || "";
    self.dataInputService.search(self.data).then(
      response => {
        self.currentPage = self.data.currentPage;
        self.sort = self.data.sort;
        self.datasource = response.data;
      },
      () => {}
    );
    self.isCheckAll = false;
    self.checkBoxes = [];
  }

  onUpdate(model) {
    var self = this;
    self.$uibModal
      .open({
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        template: require("./view/update.html"),
        controller: "dataInputUpdateController",
        controllerAs: "ctrl",
        resolve: {
          model: function() {
            return angular.copy(model);
          }
        }
      })
      .result.then(
        () => {
          self.onSearch();
        },
        () => {}
      );
  }

  onCreate() {
    var self = this;
    this.$uibModal
      .open({
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        template: require("./view/create.html"),
        controller: "dataInputCreateController",
        controllerAs: "ctrl"
      })
      .result.then(
        () => {
          self.onSearch();
        },
        () => {}
      );
  }

  onCheckItem(id) {
    var self = this;
    if (self.datasource && self.datasource.data) {
      if (self.checkBoxes[id]) {
        let selectedLength = self.checkBoxes.filter(u => u).length;
        if (selectedLength == self.datasource.data.length) {
          self.isCheckAll = true;
        }
      } else {
        self.isCheckAll = false;
      }
    }
  }

  onCheckAll(keyID) {
    var self = this;
    if (self.datasource && self.datasource.data) {
      angular.forEach(self.datasource.data, item => {
        self.checkBoxes[item[keyID]] = self.isCheckAll;
      });
    }
  }

  onDelete(model, keyID) {
    var self = this;
    self.dataInputService.confirm("CONFIRM.DELETE").then(
      () => {
        self.buildingService.delete(model, keyID).then(
          response => {
            self.localeToastrService.success("MESSAGE.COMMON.DELETE_SUCCESS");
            self.onSearch();
          },
          function(error) {
            self.localeToastrService.error("MESSAGE.COMMON.DELETE_FAIL");
          }
        );
      },
      () => {}
    );
  }

  onDeleteMulti(keyID) {
    var self = this;
    self.confirmDialog.confirm("CONFIRM.DELETE").then(
      () => {
        let listId = self.datasource.data
          .filter(item => {
            return self.checkBoxes[item[keyID]];
          })
          .map(item => {
            return item[keyID];
          });
        self.dataInputService.deleteMulti({ ids: listId }).then(
          response => {
            self.localeToastrService.success("MESSAGE.COMMON.DELETE_SUCCESS");
            self.onSearch();
          },
          function(error) {
            console.log(error);
            self.localeToastrService.error("MESSAGE.COMMON.DELETE_FAIL");
          }
        );
      },
      () => {}
    );
  }
}

class DataInputCreateController {
  constructor(
    $uibModalInstance,
    localeToastrService,
    dataInputService,
    buildingService,
    floorService,
    apartmentService,
    serviceService
  ) {
    let self = this;
    self.dataInputService = dataInputService;
    self.localeToastrService = localeToastrService;
    self.$uibModalInstance = $uibModalInstance;
    self.buildingService = buildingService;
    self.floorService = floorService;
    self.apartmentService = apartmentService;
    self.serviceService = serviceService;

    self.listBuilding = [];
    self.listFloor = [];
    self.listApartment = [];
    self.listService = [];
    self.listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    //data form create
    self.data = {};
    this.onInit();
  }

  onInit() {
    const self = this;
    //bulding
    self.buildingService.getAll().then(result => {
      self.listBuilding = result.data;
    });
    //service
    self.serviceService.search({}).then(result => {
      self.listService = result.data;
    });
  }

  onBuildingChange() {
    const self = this;
    if (self.data.buildingId) {
      self.floorService.findByBuildingId(self.data.buildingId).then(result => {
        self.listFloor = result.data;
      });
    }
  }

  onFloorChange() {
    const self = this;
    if (self.data.floorId) {
      self.apartmentService.findByFloorId(self.data.floorId).then(result => {
        self.listApartment = result.data;
      });
    }
  }

  onServiceChange(){
    let self = this;
    let services=self.listService.data.filter((service)=>{
      return service.serviceId==Number(self.data.serviceId)
    })
    if (services.constructor===Array && services.length>=1){
      self.data.serviceName=services[0].serviceName
    }
    self.data.paramFirst=null
    self.data.paramLast=null
    self.data.paramTotal=null
  }

  onParamChange(){
    let self=this;
    let paramFirst=self.data.paramFirst||0;
    let paramLast=self.data.paramLast||0;
    if(self.data.serviceName==ServiceType.Electric||self.data.serviceName==ServiceType.ElectricEN){
      self.data.paramTotal= paramLast-paramFirst
    }
  }

  onSubmit() {
    const self = this;

    let objectDataCopy = Object.assign({}, self.data);
    delete objectDataCopy.buildingId;
    delete objectDataCopy.floorId;
    delete objectDataCopy.serviceName
    self.dataInputService.create(objectDataCopy).then(
      response => {
        self.localeToastrService.success("MESSAGE.COMMON.CREATE_SUCCESS");
        self.$uibModalInstance.close("saved");
      },
      function(error) {
        self.localeToastrService.error("MESSAGE.COMMON.CREATE_FAIL");
      }
    );
  }
}

class DataInputUpdateController {
  constructor(
    $uibModalInstance,
    localeToastrService,
    dataInputService,
    buildingService,
    floorService,
    apartmentService,
    serviceService,
    model
  ) {
    let self = this;
    self.dataInputService = dataInputService;
    self.localeToastrService = localeToastrService;
    self.$uibModalInstance = $uibModalInstance;
    self.buildingService = buildingService;
    self.floorService = floorService;
    self.apartmentService = apartmentService;
    self.serviceService = serviceService;

    self.listBuilding = [];
    self.listFloor = [];
    self.listApartment = [];
    self.listService = [];
    self.listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    //data form create
    self.data = model;
    this.onInit();
  }

  onInit() {
    const self = this;
    //bulding
    self.buildingService.getAll().then(result => {
      self.listBuilding = result.data;
    });
    //floor
    self.floorService.findByBuildingId(self.data.buildingId).then(result => {
      self.listFloor = result.data;
    });
    //apartment
    self.apartmentService
      .findByFloorId(self.data.floorId)
      .then(result => {
        self.listApartment = result.data;
      });
    //service
    self.serviceService.search({}).then(result => {
      self.listService = result.data;
    });
  }

  onServiceChange(){
    let self = this;
    let services=self.listService.data.filter((service)=>{
      return service.serviceId==Number(self.data.serviceId)
    })
    if (services.constructor===Array && services.length>=1){
      self.data.serviceName=services[0].serviceName
    }
    self.data.paramFirst=null
    self.data.paramLast=null
    self.data.paramTotal=null
  }

  onParamChange(){
    let self=this;
    let paramFirst=self.data.paramFirst||0;
    let paramLast=self.data.paramLast||0;
    if(self.data.serviceName==ServiceType.Electric||self.data.serviceName==ServiceType.ElectricEN){
      self.data.paramTotal=paramLast - paramFirst
    }
  }

  onSubmit() {
    const self = this;

    let objectDataCopy = Object.assign({}, self.data);
    delete objectDataCopy.buildingId;
    delete objectDataCopy.floorId;
    delete objectDataCopy.buildingCode;
    delete objectDataCopy.floorCode
    delete objectDataCopy.apartmentName
    delete objectDataCopy.serviceName
    self.dataInputService.update(objectDataCopy).then(
      response => {
        self.localeToastrService.success("MESSAGE.COMMON.UPDATE_SUCCESS");
        self.$uibModalInstance.close("saved");
      },
      function(error) {
        self.localeToastrService.error("MESSAGE.COMMON.UPDATE_FAIL");
      }
    );
  }
}

DatainputController.$inject = [
  "$uibModal",
  "confirmDialog",
  "localeToastrService",
  "dataInputService"
];
DataInputCreateController.$inject = [
  "$uibModalInstance",
  "localeToastrService",
  "dataInputService",
  "buildingService",
  "floorService",
  "apartmentService",
  "serviceService"
];
DataInputUpdateController.$inject = [
  "$uibModalInstance",
  "localeToastrService",
  "dataInputService",
  "buildingService",
  "floorService",
  "apartmentService",
  "serviceService",
  "model"
];
export {
  DatainputController,
  DataInputCreateController,
  DataInputUpdateController
};
