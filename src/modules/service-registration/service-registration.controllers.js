const ListRegistrationType = [
  {
    type: "EXPAND",
    name: "Đăng ký vượt chi tiêu"
  },
  {
    type: "OWNER",
    name: "Chủ hộ"
  },
  {
    type: "FAMILY",
    name: "Người thân"
  },
  {
    type: "RENTER",
    name: "Người mượn nhà để ở"
  },
  {
    type: "BORROWER",
    name: "Người thuê nhà"
  }
];
const YESNO = {
  yes: "YES",
  no: "NO"
};
const ListStatus=[
  "PENDING", 
  "APPROVED", 
  "ACTIVE", 
  "INACTIVE", 
  "REJECTED"
]


class ServiceRegistrationController {
  constructor(
    $uibModal,
    $state,
    serviceRegistrationService,
    confirmDialog,
    localeToastrService,
    Upload,
    serviceService
  ) {
    let self = this;
    self.$uibModal = $uibModal;
    self.$state = $state;
    self.serviceRegistrationService = serviceRegistrationService;
    self.confirmDialog = confirmDialog;
    self.localeToastrService = localeToastrService;
    self.serviceService=serviceService;
    self.currentPage = 1;
    self.sort = "";

    self.serviceRegistration = {};
    self.serviceRegistration.pageSize = 20;

    self.datasource = {};

    self.isCheckAll = false;
    self.checkBoxes = [];
    self.serviceService.search({}).then(result => {
      self.listService = result.data;
    });
    self.listStatus=ListStatus;
    self.onSearch();
  }

  onSearch(paging) {
    var self = this;
    paging = paging || {};
    self.serviceRegistration = self.serviceRegistration || {};
    self.serviceRegistration.currentPage =
      paging.pageIndex || self.currentPage || 1;
    self.serviceRegistration.sort = paging.sort || self.sort || "";
    self.serviceRegistrationService.search(self.serviceRegistration).then(
      response => {
        self.currentPage = self.serviceRegistration.currentPage;
        self.sort = self.serviceRegistration.sort;
        self.datasource = response.data;
      },
      () => {}
    );

    self.isCheckAll = false;
    self.checkBoxes = [];
  }

  onCreate() {
    this.$state.go("service-registration-create");
  }

  onUpdate(model) {
    this.$state.go("service-registration-update", {
      model: model,
      serviceRequestId: model.serviceRequestId
    });
  }

  onDelete(model) {
    var self = this;
    self.confirmDialog.confirm("CONFIRM.DELETE").then(
      () => {
        
        self.serviceRegistrationService.delete(model).then(
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

  onDeleteMulti() {
    var self = this;
    if (self.checkBoxes && self.checkBoxes.length > 0) {
      self.confirmDialog.confirm("CONFIRM.DELETE").then(
        () => {
          let listId = self.datasource.data
            .filter(item => {
              return self.checkBoxes[item.serviceRequestId];
            })
            .map(item => {
              return item.serviceRequestId;
            });
          self.serviceRegistrationService.deleteMulti({ ids: listId }).then(
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

  onCheckAll() {
    var self = this;
    if (self.datasource && self.datasource.data) {
      angular.forEach(self.datasource.data, item => {
        if (item.status=="PENDING"){
          self.checkBoxes[item.serviceRequestId] = self.isCheckAll;
        }  
      });
    }
  }
}

class ServiceRegistrationCreateController {
  constructor(
    localeToastrService,
    $state,
    serviceRegistrationService,
    uploadService,
    buildingService,
    floorService,
    groupService,
    pictureDialog,
    apartmentService,
    serviceService,
    templateService,
    tariffService
  ) {
    this.$state = $state;
    this.serviceRegistration = {};
   
    this.serviceRegistration.vehicleOwner=YESNO.no;
    this.serviceRegistration.vehicleCompany=YESNO.yes;
    this.serviceRegistration.attachmentFiles = [];
    this.serviceRegistrationService = serviceRegistrationService;
    this.localeToastrService = localeToastrService;
    this.uploadService = uploadService;
    this.floorService = floorService;
    this.buildingService = buildingService;
    this.groupService = groupService;
    this.pictureDialog = pictureDialog;
    this.apartmentService = apartmentService;
    this.serviceService = serviceService;
    this.templateService = templateService;
    this.tariffService = tariffService;
    this.listBuilding = [];
    this.listService = [];
    this.listTariffId = [];
    this.listTemplate = [];
    this.listRegistrationType = ListRegistrationType;

    this.listFBikeRegister = [];
    this.listFPartpost = [];
    this.listFHapucontract = [];
    // this.listFHapucontract=[];
    this.listFRenhouseContract = [];
    this.listFTemporaryRegistaion = [];
    this.listFHouseholdMarried = [];
    this.listFCarpurchaseContract = [];
    this.listFHapulicoPaper = [];
    this.userName=JSON.parse(localStorage.userContext).userName;
    this.onInit();
  }

  onInit() {
    const self = this;
    //building
    self.buildingService.getAll().then(result => {
      self.listBuilding = result.data;
    });
    //service
    self.serviceService.search({}).then(result => {
      self.listService = result.data;
    });
    //service
    self.templateService.search({}).then(result => {
      self.listTemplate = result.data;
    });
  }

  onChooseFileClick(id) {
    document.getElementById(id).click();
  }

  onSubmit() {
    const self = this;
    if(this.serviceRegistration.vehicleCompany==true){
      this.serviceRegistration.vehicleCompany=YESNO.no
    }
    else{
      this.serviceRegistration.vehicleCompany=YESNO.yes
    }
    if(this.serviceRegistration.vehicleOwner==true){
      this.serviceRegistration.vehicleOwner=YESNO.no
    }
    else{
      this.serviceRegistration.vehicleOwner=YESNO.yes
    }
    self.serviceRegistrationService.create(self.serviceRegistration).then(
      response => {
        self.localeToastrService.success("MESSAGE.COMMON.CREATE_SUCCESS");
        self.$state.go("service-registration");
      },
      function(error) {
        self.localeToastrService.error("MESSAGE.COMMON.CREATE_FAIL");
      }
    );
  }

  onBuildingChange() {
    const self = this;
    self.floorService
      .findByBuildingId(self.serviceRegistration.buildingId)
      .then(result => {
        self.listFloor = result.data;
      });
  }

  onFloorChange() {
    const self = this;
    if (self.serviceRegistration.floorId) {
      self.apartmentService
        .findByFloorId(self.serviceRegistration.floorId)
        .then(result => {
          self.listApartment = result.data;
        });
    }
  }

  onServiceChange() {
    const self = this;
    if (self.serviceRegistration.serviceId) {
      self.tariffService
        .findByServiceId(self.serviceRegistration.serviceId)
        .then(result => {
          self.listTariffId = result.data;
        });
    }
  }

  onInputFileChange(listFile, inputType) {
    
    this.uploadFiles(listFile, inputType);
  }

  onRemoveFile(file, listFile,inputDomId) {
    const self = this;
    document.getElementById(inputDomId).value='';
    self.serviceRegistrationService
      .deleteFileAttachment(file.uploadId)
      .then(function(resp) {
        listFile.splice(listFile.indexOf(file),1)
     
        var fileAttach = $.grep(self.serviceRegistration.attachmentFiles, function(e){ return e.uploadId == file.uploadId; });
        self.serviceRegistration.attachmentFiles
        .splice(self.serviceRegistration.attachmentFiles.indexOf(fileAttach),1)
      }, null, function(evt) {
        console.log(evt);
      });
  }

  uploadFiles(files, inputType) {
    const self = this;
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        self.file = files[i];
        if (!self.file.$error) {
          self.uploadService
            .uploadFileServiceResgitaion(self.file, inputType)
            .then(
              function(resp, status, headers, config) {
                self.serviceRegistration.attachmentFiles.push(resp.data);
                resp.config.data.file.uploadId = resp.data.uploadId;
              },
              null,
              function(evt) {
                console.log(evt);
              }
            );
        }
      }
    }
  }

}

class ServiceRegistrationUpdateController {
  constructor(
    localeToastrService,
    $state,
    serviceRegistrationService,
    uploadService,
    buildingService,
    floorService,
    groupService,
    pictureDialog,
    apartmentService,
    serviceService,
    templateService,
    tariffService
  ) {
    this.$state = $state;
    this.serviceRegistration = $state.params.model || {};
    this.serviceRegistration.attachmentFiles = [];
    this.serviceRegistrationService = serviceRegistrationService;
    this.localeToastrService = localeToastrService;
    this.uploadService = uploadService;
    this.floorService = floorService;
    this.buildingService = buildingService;
    this.groupService = groupService;
    this.pictureDialog = pictureDialog;
    this.apartmentService = apartmentService;
    this.serviceService = serviceService;
    this.templateService = templateService;
    this.tariffService = tariffService;
    this.listBuilding = [];
    this.listService = [];
    this.listTariffId = [];
    this.listTemplate = [];
    this.listRegistrationType = ListRegistrationType;
    this.listFBikeRegister = [];
    this.listFPartpost = [];
    this.listFHapucontract = [];
    this.listFRenhouseContract = [];
    this.listFTemporaryRegistaion = [];
    this.listFHouseholdMarried = [];
    this.listFCarpurchaseContract = [];
    this.listFHapulicoPaper = [];
    this.onInit();
  }

  onChooseFileClick(id) {
    document.getElementById(id).click();
  }
  onInit() {
    const self = this;
    if (
      !self.serviceRegistration.buildingId ||
      !self.serviceRegistration.serviceRequestId
    ) {
      self.$state.go("service-registration");
    } else {
      self.buildingService.getAll().then(result => {
        self.listBuilding = result.data;
      });
      
      self.serviceRegistrationService
        .getRequestServiceDetail(self.serviceRegistration.serviceRequestId)
        .then(result => {
          self.serviceRegistration = Object.assign(
            {},
            result.data,
            self.serviceRegistration
          );
          if(this.serviceRegistration.vehicleCompany==YESNO.no){
            this.serviceRegistration.vehicleCompany=true
          }
          else{
            this.serviceRegistration.vehicleCompany=false
          }
          if(this.serviceRegistration.vehicleOwner==YESNO.no){
            this.serviceRegistration.vehicleOwner=true
          }
          else{
            this.serviceRegistration.vehicleOwner=false
          }

          this.listFBikeRegister = [];
          this.listFPartpost = [];
          this.listFHapucontract = [];
          this.listFRenhouseContract = [];
          this.listFTemporaryRegistaion = [];
          this.listFHouseholdMarried = [];
          this.listFCarpurchaseContract = [];
          this.listFHapulicoPaper = [];
          
          self.listFBikeRegister = self.convertToFileList(
            result.data.vehicleRegisDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.vehicleRegisDoc);
          self.listFPartpost = self.convertToFileList(
            result.data.identifyCardDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.identifyCardDoc);
          self.listFHapucontract = self.convertToFileList(
            result.data.redBookDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.redBookDoc);
          self.listFRenhouseContract = self.convertToFileList(
            result.data.tenancyContractDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.tenancyContractDoc);
          self.listFTemporaryRegistaion = self.convertToFileList(
            result.data.temporaryRegistrationDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.temporaryRegistrationDoc);
          self.listFHouseholdMarried = self.convertToFileList(
            result.data.relationshipDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.relationshipDoc);
          self.listFCarpurchaseContract = self.convertToFileList(
            result.data.vehicleOwnerDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.vehicleOwnerDoc);
          self.listFHapulicoPaper = self.convertToFileList(
            result.data.vehicleHapuDoc
          );
          self.serviceRegistration.attachmentFiles=self.serviceRegistration.attachmentFiles.concat(result.data.vehicleHapuDoc);
          if (self.serviceRegistration.serviceId) {
            self.tariffService
              .findByServiceId(self.serviceRegistration.serviceId)
              .then(result => {
                self.listTariffId = result.data;
              });
          }
        });

      self.floorService
        .findByBuildingId(self.serviceRegistration.buildingId)
        .then(result => {
          self.listFloor = result.data;
        });

      if (self.serviceRegistration.floorId) {
        self.apartmentService
          .findByFloorId(self.serviceRegistration.floorId)
          .then(result => {
            self.listApartment = result.data;
          });
      }

      if (self.serviceRegistration.serviceId) {
        self.tariffService
          .findByServiceId(self.serviceRegistration.serviceId)
          .then(result => {
            self.listTariffId = result.data;
          });
      }

      //service
      self.serviceService.search({}).then(result => {
        self.listService = result.data;
      });

      //service
      self.templateService.search({}).then(result => {
        self.listTemplate = result.data;
      });
    }
  }

  convertToFileList(listData) {
    let result = [];
    if (listData && listData.length > 0) {
      for (var i = 0; i < listData.length; i++) {
        if(listData[i].path){
          result.push({
            name: listData[i].path.replace(/^.*[\\\/]/, ""),
            uploadId: listData[i].uploadId,
            documentType: listData[i].documentType
          });
        }
        
      }
    }
    return result;
  }

  
  onApprove(){
    const self=this;
    let data={
      apartmentServiceId:self.serviceRegistration.apartmentServiceId,
      replyMessageTitle:self.serviceRegistration.replyMessageTitle,
      replyMessageContent:self.serviceRegistration.replyMessageContent
    }
    self.serviceRegistrationService.approve(data).then(
      response => {
        self.localeToastrService.success("MESSAGE.COMMON.APRROVE_SUCCESS");
        //self.$state.go("service-registration");
        self.isApproveOrReject=true;
      },
      error => {
        self.localeToastrService.error("MESSAGE.COMMON.APRROVE_FAIL");
      }
    );
  }
    
  onReject(){
    const self=this;
    let data={
      apartmentServiceId:self.serviceRegistration.apartmentServiceId,
      replyMessageTitle:self.serviceRegistration.replyMessageTitle,
      replyMessageContent:self.serviceRegistration.replyMessageContent
    }
    self.serviceRegistrationService.reject(data).then(
      response => {
        self.localeToastrService.success("MESSAGE.COMMON.REJECT_SUCCESS");
        self.isApproveOrReject=true;
      },
      error => {
        self.localeToastrService.error("MESSAGE.COMMON.REJECT_FAIL");
      }
    );
  }

  onSubmit() {
    const self = this;
    if(self.serviceRegistration.vehicleCompany==true){
      self.serviceRegistration.vehicleCompany=YESNO.no
    }
    else{
      self.serviceRegistration.vehicleCompany=YESNO.yes
    }
    if(self.serviceRegistration.vehicleOwner==true){
      self.serviceRegistration.vehicleOwner=YESNO.no
    }
    else{
      self.serviceRegistration.vehicleOwner=YESNO.yes
    }
    self.serviceRegistrationService.update(self.serviceRegistration).then(
      response => {
        self.localeToastrService.success("MESSAGE.COMMON.UPDATE_SUCCESS");
        //self.$state.go("service-registration");
      },
      error => {
        self.localeToastrService.error("MESSAGE.COMMON.UPDATE_FAIL");
      }
    );
  }

  onInputFileChange(listFile, inputType) {
    
    this.uploadFiles(listFile, inputType);
  }

  onRemoveFile(file, listFile,inputDomId) {
    const self = this;
    document.getElementById(inputDomId).value='';
    self.serviceRegistrationService
      .deleteFileAttachment(file.uploadId)
      .then(function(resp) {
        listFile.splice(listFile.indexOf(file),1)
        
        var fileAttach = $.grep(self.serviceRegistration.attachmentFiles, function(e){ return e.uploadId == file.uploadId; });
        self.serviceRegistration.attachmentFiles
        .splice(self.serviceRegistration.attachmentFiles.indexOf(fileAttach),1)
      }, null, function(evt) {
        console.log(evt);
      });
  }

  uploadFiles(files, inputType) {
    const self = this;
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        self.file = files[i];
        if (!self.file.$error) {
          self.uploadService
            .uploadFileServiceResgitaion(self.file, inputType)
            .then(
              function(resp, status, headers, config) {
                self.serviceRegistration.attachmentFiles.push(resp.data);
                resp.config.data.file.uploadId = resp.data.uploadId;
              },
              null,
              function(evt) {
                console.log(evt);
              }
            );
        }
      }
    }
  }
  
}

ServiceRegistrationController.$inject = [
  "$uibModal",
  "$state",
  "serviceRegistrationService",
  "confirmDialog",
  "localeToastrService",
  "Upload",
  "serviceService"
];
ServiceRegistrationCreateController.$inject = [
  "localeToastrService",
  "$state",
  "serviceRegistrationService",
  "uploadService",
  "buildingService",
  "floorService",
  "groupService",
  "pictureDialog",
  "apartmentService",
  "serviceService",
  "templateService",
  "tariffService"
];
ServiceRegistrationUpdateController.$inject = [
  "localeToastrService",
  "$state",
  "serviceRegistrationService",
  "uploadService",
  "buildingService",
  "floorService",
  "groupService",
  "pictureDialog",
  "apartmentService",
  "serviceService",
  "templateService",
  "tariffService"
];

export {
  ServiceRegistrationController,
  ServiceRegistrationCreateController,
  ServiceRegistrationUpdateController
};
