class BuildingController {
    constructor($uibModal, buildingService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.buildingService = buildingService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.building = {};
        self.building.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.building = self.building || {};
        self.building.currentPage = paging.pageIndex || self.currentPage || 1;
        self.building.sort = paging.sort || self.sort || '';
        self.buildingService.search(self.building).then((response) => {
            self.currentPage = self.building.currentPage;
            self.sort = self.building.sort;
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
            template: require('./view/create.html'),
            controller: 'BuildingCreateController',
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
            template: require('./view/update.html'),
            controller: 'BuildingUpdateController',
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
            self.buildingService.delete(model).then((response) => {
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
                        return self.checkBoxes[item.buildingId];
                    })
                    .map(item => {
                        return item.buildingId
                    });
                self.buildingService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    console.log(erro)
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
                self.checkBoxes[item.buildingId] = self.isCheckAll;
            });
        }
    }
}

class BuildingCreateController {
    constructor($uibModalInstance, localeToastrService, buildingService) {
        this.building = {};
        this.buildingService = buildingService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onSubmit() {
        const self = this;
        self.buildingService.create(self.building).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }
}

class BuildingUpdateController {
    constructor($uibModalInstance, localeToastrService, buildingService, floorService, model, confirmDialog) {
        this.building = model;
        this.buildingService = buildingService;
        this.floorService = floorService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.confirmDialog = confirmDialog;

        this.floor = { buildingId: this.building.buildingId };

        this.loadFloors();
    }

    loadFloors() {
        const self = this;
        self.floorService.findByBuildingId(self.building.buildingId)
            .then((response) => {
                self.listFloor = response.data;
            });
    }

    onCreateFloor() {
        const self = this;
        self.floorService.create(self.floor).then(response => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.loadFloors();
            self.floor = { buildingId: self.building.buildingId};
        })
    }

    onUpdateFloor(floor) {
        const self = this;
        if (floor.editting) {
            self.floorService.update(floor).then(response => {
                self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
                floor.editting = false;
                self.loadFloors();
            })
        } else {
            floor.editting = true;
        }
    }

    onDeleteFloor(floor) {
        const self = this;
        self.confirmDialog.confirm('CONFIRM.DELETE').then(() => {
            self.floorService.delete(floor).then((response) => {
                self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                self.loadFloors();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.COMMON.DELETE_FAIL');
            });
        }, () => { });
    }

    onSubmit() {
        const self = this;
        self.buildingService.update(self.building).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON.UPDATE_FAIL');
        });
    }
}

BuildingController.$inject = ['$uibModal', 'buildingService', 'confirmDialog', 'localeToastrService'];
BuildingCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'buildingService'];
BuildingUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'buildingService', 'floorService', 'model', 'confirmDialog'];

export { BuildingController, BuildingCreateController, BuildingUpdateController }