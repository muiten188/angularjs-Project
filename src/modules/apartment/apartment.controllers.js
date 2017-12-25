class ApartmentController {
    constructor($uibModal, apartmentService, confirmDialog, localeToastrService, Upload) {
        let self = this;
        self.$uibModal = $uibModal;
        self.apartmentService = apartmentService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.apartment = {};
        self.apartment.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.apartment = self.apartment || {};
        self.apartment.currentPage = paging.pageIndex || self.currentPage || 1;
        self.apartment.sort = paging.sort || self.sort || '';
        self.apartmentService.search(self.apartment).then((response) => {
            self.currentPage = self.apartment.currentPage;
            self.sort = self.apartment.sort;
            self.datasource = response.data;
        }, () => { });

        self.isCheckAll = false;
        self.checkBoxes = [];
    }

    onCreate() {
        var self = this;
        this.$uibModal.open({ 
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/form.html'),
            controller: 'ApartmentCreateController',
            controllerAs: 'ctrl'
        }).result.then(() => {
            self.onSearch();
        }, () => { });
    }

    onUpdate(model) {
        var self = this;
        self.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/form.html'),
            controller: 'ApartmentUpdateController',
            controllerAs: 'ctrl',
            resolve: {
                model: function () {
                    return angular.copy(model);
                }
            }
        }).result.then(() => {
            self.onSearch();
        }, () => { });
    }

    onDelete(model) {
        var self = this;
        self.confirmDialog.confirm('CONFIRM.DELETE').then(() => {
            self.apartmentService.delete(model).then((response) => {
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
                        return self.checkBoxes[item.apartmentId];
                    })
                    .map(item => {
                        return item.apartmentId
                    });
                self.apartmentService.deleteMulti({ ids: listId }).then((response) => {
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
                self.checkBoxes[item.apartmentId] = self.isCheckAll;
            });
        }
    }
}

class ApartmentCreateController {
    constructor($uibModalInstance, localeToastrService, apartmentService, uploadService, buildingService, floorService, groupService, pictureDialog,tariffService) {
        this.apartment = {};
        this.apartment.plans = [];
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.uploadService = uploadService;
        this.floorService = floorService;
        this.buildingService = buildingService;
        this.groupService = groupService;
        this.pictureDialog = pictureDialog;
        this.tariffService =tariffService;
        this.onInit();
    }

    onInit() {
        const self = this;
        self.buildingService
            .getAll()
            .then((result) => {
                self.listBuilding = result.data;
            });
        self.tariffService
            .findByServiceType('BUILDING_SERVICE')
            .then(result => {
              self.listTariffId = result.data;
            });
    }

    onSubmit() {
        const self = this;
        self.apartment.groupIdMembers = self.groupList ? self.groupList.map(item => { return item.groupId; }) : [];
        self.apartmentService.create(self.apartment).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }

    onBuildingChange() {
        const self = this;
        self.floorService
            .findByBuildingId(self.apartment.buildingId)
            .then((result) => {
                self.listFloor = result.data;
            });
    }

    uploadFiles(files) {
        const self = this;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    self.uploadService.uploadPlan(file).then(function (resp) {
                        self.apartment.plans.push(resp.data);
                    }, null, function (evt) {
                        console.log(evt);
                    });
                }
            }
        }
    };

    refreshGroups(search) {
        const self = this;
        self.groupService.searchByText({ search: search })
            .then(response => {
                self.availableGroups = response.data;
            });
    }

    showPicture(index) {
        this.pictureDialog.showDialog({pictures: this.apartment.plans, index: index});
    }
}

class ApartmentUpdateController {
    constructor($uibModalInstance, localeToastrService, apartmentService, model, uploadService, buildingService, floorService, groupService, pictureDialog,tariffService) {
        this.apartment = model;
        this.apartment.plans = [];
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.uploadService = uploadService;
        this.buildingService = buildingService;
        this.floorService = floorService;
        this.groupService = groupService;
        this.pictureDialog = pictureDialog;
        this.tariffService =tariffService;
        
        this.onInit();
    }

    onInit() {
        const self = this;
        self.buildingService
            .getAll()
            .then((result) => {
                self.listBuilding = result.data;
            });

        self.floorService
            .findByBuildingId(self.apartment.buildingId)
            .then((result) => {
                self.listFloor = result.data;
            });
        self.tariffService
            .findByServiceType('BUILDING_SERVICE')
            .then(result => {
              self.listTariffId = result.data;
            });
            
        self.uploadService.findApartmentPlan(self.apartment.apartmentId)
            .then(result => {
                self.apartment.plans = result.data;
            });

        self.groupService.findByApartmentId(self.apartment.apartmentId)
            .then(response => {
                self.groupList = response.data;
            });
      
    }

    onSubmit() {
        const self = this;
        self.apartment.groupIdMembers = self.groupList ? self.groupList.map(item => { return item.groupId; }) : [];
        self.apartmentService.update(self.apartment).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON_UPDATE_FAIL');
        });
    }

    uploadFiles(files) {
        const self = this;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    self.uploadService.uploadPlan(file).then(function (resp) {
                        self.apartment.plans.push(resp.data);
                    }, null, function (evt) {
                        console.log(evt);
                    });
                }
            }
        }
    }

    refreshGroups(search) {
        const self = this;
        self.groupService.searchByText({ search: search })
            .then(response => {
                self.availableGroups = response.data;
            });
    }

    showPicture(index) {
        this.pictureDialog.showDialog({pictures: this.apartment.plans, index: index});
    }
}

ApartmentController.$inject = ['$uibModal', 'apartmentService', 'confirmDialog', 'localeToastrService', 'Upload'];
ApartmentCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'apartmentService', 'uploadService', 'buildingService', 'floorService', 'groupService', 'pictureDialog','tariffService'];
ApartmentUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'apartmentService', 'model', 'uploadService', 'buildingService', 'floorService', 'groupService', 'pictureDialog','tariffService'];

export { ApartmentController, ApartmentCreateController, ApartmentUpdateController }