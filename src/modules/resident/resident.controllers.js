const TABS = {
    DOWNLOAD_SAMPLE: 0,
    UPLOAD_FILE: 1,
    VERIFY_UPLOAD: 2
}
import APP from "../../config/constants.js";
class ResidentController {
    constructor($uibModal, $state, residentService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.residentService = residentService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;
        self.$state = $state;

        self.currentPage = 1;
        self.sort = "";

        self.resident = {};
        self.resident.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];
        self.datepickerOptions = {
            datepickerMode:"'year'",
            minMode:"'year'",
            minDate:"minDate",
            showWeeks:"false",
         };
         self.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };
        self.formats = ['yyyy'];
        self.format = self.formats[0];
        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.resident = self.resident || {};
        self.resident.currentPage = paging.pageIndex || self.currentPage || 1;
        self.resident.sort = paging.sort || self.sort || '';
        self.residentService.search(self.resident).then((response) => {
            self.currentPage = self.resident.currentPage;
            self.sort = self.resident.sort;
            self.datasource = response.data;
        }, () => { });

        self.isCheckAll = false;
        self.checkBoxes = [];
    }

    onCreate() {
        this.$state.go('resident-create');
    }

    onUpdate(model) {
        this.$state.go('resident-update', { residentId: model.residentId });
    }

    onImport() {
        this.$state.go('resident-import');
    }

    onDelete(model) {
        var self = this;
        self.confirmDialog.confirm('CONFIRM.DELETE').then(() => {
            self.residentService.delete(model).then((response) => {
                self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                self.onSearch();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.COMMON.DELETE_FAIL');
            });

        }, () => { });
    }

    onDeleteMulti() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.DELETE').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.residentId];
                    })
                    .map(item => {
                        return item.residentId
                    });
                self.residentService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.COMMON.DELETE_FAIL');
                });
            }, () => { });
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
            angular.forEach(self.datasource.data, (item) => {
                self.checkBoxes[item.residentId] = self.isCheckAll;
            });
        }
    }
}

class ResidentCreateController {
    constructor($uibModal, confirmDialog, localeToastrService, residentService, uploadService, apartmentService) {
        this.$uibModal = $uibModal;
        this.confirmDialog = confirmDialog;
        this.residentService = residentService;
        this.uploadService = uploadService;
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;

        this.resident = {};
        this.resident.birthday = moment();
        this.resident.listDependence = [];
        this.resident.listResidentApartment = [];
        this.resident.birthday=""
        this.apartment = {};
        this.residentApartment = { staying: 'NO', receiveNotification: 'NO' };
    }

    onSubmit() {
        const self = this;
        self.residentService.create(self.resident).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }

    refreshApartments(search) {
        if (angular.isUndefined(search) || search == null || search.length < 3) return;

        const self = this;
        self.apartmentService.searchByText({ search: search })
            .then(response => {
                self.availableApartments = response.data;
            });
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.uploadService.uploadResident(file).then(function (resp) {
                self.resident.avatar = resp.data.path;
            }, null, function (evt) {
            });
        }
    }

    onAddApartment() {
        const existed = this.resident.listResidentApartment.find(item => {
            return item.apartmentId === this.apartment.apartmentId
        });
        if (self.residentApartment.residentType=="OWNER"){
            self.residentApartment.receiveNotification="YES";
        }
        if (this.apartment.apartmentId && !existed) {
            const mergeObject = Object.assign(this.apartment, this.residentApartment);
            this.resident.listResidentApartment.push(mergeObject);
            this.apartment = {};
            this.residentApartment = { staying: 'NO', receiveNotification: 'NO' };
        }
    }

    onRemoveApartment(index) {
        this.resident.listResidentApartment.splice(index, 1);
        this.apartment = {};
        this.residentApartment = { staying: 'NO', receiveNotification: 'NO' };
    }

    // onResidentTypeChange(){
    //     console.log(this.residentApartment)
    //     if(this.residentApartment.residentType=="BORROWER"){
    //         this.residentApartment.receiveNotification='YES'
    //     }
    //     else{
    //         this.residentApartment.receiveNotification='NO'
    //     }
    //     console.log(this.residentApartment)
    // }

}

class ResidentUpdateController {
    constructor($uibModal, confirmDialog, localeToastrService, residentService, uploadService, apartmentService, $stateParams) {
        this.$uibModal = $uibModal;
        this.confirmDialog = confirmDialog;
        this.residentService = residentService;
        this.uploadService = uploadService;
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$stateParams = $stateParams;
        this.residentApartment={staying: 'NO', receiveNotification: 'NO'};
        this.residentId = this.$stateParams.residentId;
        this.onInit();
    }

    onInit() {
        const self = this;
        self.residentService.getById(self.residentId).then(response => {
            self.resident = response.data;
            self.apartmentService.findByResidentId(self.$stateParams.residentId).then(aresponse => {
                self.resident.listResidentApartment = aresponse.data.map(item => {
                    return {
                        ...item, name: item.apartmentCode
                    }
                });
                console.log(self.resident);
            });
        });
    }

    refreshApartments(search) {
        if (angular.isUndefined(search) || search == null || search.length < 3) return;

        const self = this;
        self.apartmentService.searchByText({ search: search })
            .then(response => {
                self.availableApartments = response.data;
            });
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.uploadService.uploadResident(file).then(function (resp) {
                self.resident.avatar = resp.data.path;
            }, null, function (evt) {
            });
        }
    }

    onAddApartment() {
        const self = this;
        
        const existed = this.resident.listResidentApartment.find(item => {
            return item.apartmentId === this.apartment.apartmentId
        });
        
        if (self.apartment.apartmentId && !existed) {
            self.confirmDialog.confirm('CONFIRM.ADD_APARTMENT').then(() => {
                if (self.residentApartment.residentType=="OWNER"){
                    self.residentApartment.receiveNotification="YES";
                }
                const mergeObject = Object.assign(self.apartment, self.residentApartment);
                self.residentService.addApartment(self.residentId, mergeObject).then(result => {
                    self.resident.listResidentApartment.push(mergeObject);
                    self.apartment = {};
                    self.residentApartment = { staying: 'NO', receiveNotification: 'NO' };
                });
            }, () => { });
        }
    }

    onRemoveApartment(index) {
        const self = this;
        const apartment = self.resident.listResidentApartment[index];
        self.confirmDialog.confirm('CONFIRM.ADD_APARTMENT').then(() => {
            self.residentService.removeApartment(self.residentId, apartment.apartmentId).then(result => {
                self.resident.listResidentApartment.splice(index, 1);
                self.apartment = {};
                self.residentApartment = { staying: 'NO', receiveNotification: 'NO' };
            });
        }, () => { });
    }

    onSubmit() {
        const self = this;
        console.log(self.resident);
        self.residentService.update(self.resident).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON.UPDATE_FAIL');
        });
    }

    // onResidentTypeChange(){
    //     console.log(this.residentApartment)
    //     debugger;
    //     if(this.residentApartment.residentType=="BORROWER"){
    //         this.residentApartment.receiveNotification='YES'
    //     }
    //     console.log(this.residentApartment)
    // }
}

class ResidentImportController {
    constructor($uibModal, $location, confirmDialog, localeToastrService, residentService, uploadService, apartmentService, $stateParams) {
        this.$uibModal = $uibModal;
        this.$location = $location;
        this.confirmDialog = confirmDialog;
        this.residentService = residentService;
        this.uploadService = uploadService;
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$stateParams = $stateParams;

        
        self.currentPage = 1;
        self.sort = "";

        self.resident = {};
        self.resident.pageSize = 20;

        self.datasource = {};

        this.import = { activeTab: TABS.DOWNLOAD_SAMPLE };
    }

    onDownloadSampleFile() {
        const self = this;
        if (self.import.import_file) {
            self.import.activeTab = TABS.UPLOAD_FILE;
            if (self.import.import_file === 'INFO') {
                self.residentService.downloadTemplate().then(response => {
                    console.log(APP.API_PATH + "/"+response.data.fileUrl);
                    window.location =APP.API_PATH +"/"+ response.data.fileUrl;
                });
               
            }
            if (self.import.import_file === 'APARTMENT') {
                window.location = 'http://vnexpress.vn';
            }
        }
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.import.activeTab = TABS.VERIFY_UPLOAD;
            self.uploadService.importResidentData(file).then(function (response) {
                self.datasource = response;
            }, null, function (evt) {
            });
        }
    }
}

ResidentController.$inject = ['$uibModal', '$state', 'residentService', 'confirmDialog', 'localeToastrService'];
ResidentCreateController.$inject = ['$uibModal', 'confirmDialog', 'localeToastrService', 'residentService', 'uploadService', 'apartmentService'];
ResidentUpdateController.$inject = ['$uibModal', 'confirmDialog', 'localeToastrService', 'residentService', 'uploadService', 'apartmentService', '$stateParams'];
ResidentImportController.$inject = ['$uibModal', '$location', 'confirmDialog', 'localeToastrService', 'residentService', 'uploadService', 'apartmentService', '$stateParams'];

export { ResidentController, ResidentCreateController, ResidentUpdateController, ResidentImportController }