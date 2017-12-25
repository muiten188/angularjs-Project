class FloorController {
    constructor($uibModal, floorService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.floorService = floorService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.floor = {};
        self.floor.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.floor = self.floor || {};
        self.floor.currentPage = paging.pageIndex || self.currentPage || 1;
        self.floor.sort = paging.sort || self.sort || '';
        self.floorService.search(self.floor).then((response) => {
            self.currentPage = self.floor.currentPage;
            self.sort = self.floor.sort;
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
            controller: 'FloorCreateController',
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
            controller: 'FloorUpdateController',
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
        self.confirmDialog.confirm('CONFIRM.DELETE_FLOOR').then(() => {
            self.floorService.delete(model).then((response) => {
                self.localeToastrService.success('MESSAGE.DELETE_FLOOR_SUCCESS');
                self.onSearch();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.DELETE_FLOOR_FAIL');
            });

        }, () => { });
    }

    onDeleteMulti() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.DELETE_FLOORS').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.floorId];
                    })
                    .map(item => {
                        return item.floorId
                    });
                self.floorService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.DELETE_FLOOR_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.DELETE_FLOOR_FAIL');
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
                self.checkBoxes[item.floorId] = self.isCheckAll;
            });
        }
    }
}

class FloorCreateController {
    constructor($uibModalInstance, localeToastrService, floorService) {
        this.floor = {};
        this.floorService = floorService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onSubmit() {
        const self = this;
        self.floorService.create(self.floor).then((response) => {
            self.localeToastrService.success('MESSAGE.CREATE_FLOOR_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.CREATE_FLOOR_FAIL');
        });
    }
}

class FloorUpdateController {
    constructor($uibModalInstance, localeToastrService, floorService, model) {
        this.floor = model;
        this.floorService = floorService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onSubmit() {
        const self = this;
        self.floorService.update(self.floor).then((response) => {
            self.localeToastrService.success('MESSAGE.UPDATE_FLOOR_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.UPDATE_FLOOR_FAIL');
        });
    }
}

FloorController.$inject = ['$uibModal', 'floorService', 'confirmDialog', 'localeToastrService'];
FloorCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'floorService'];
FloorUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'floorService', 'model'];

export { FloorController, FloorCreateController, FloorUpdateController }