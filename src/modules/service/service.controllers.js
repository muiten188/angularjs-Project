class ServiceController {
    constructor($uibModal, serviceService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.serviceService = serviceService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.service = {};
        self.service.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.service = self.service || {};
        self.service.currentPage = paging.pageIndex || self.currentPage || 1;
        self.service.sort = paging.sort || self.sort || '';
        self.serviceService.search(self.service).then((response) => {
            self.currentPage = self.service.currentPage;
            self.sort = self.service.sort;
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
            controller: 'ServiceCreateController',
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
            controller: 'ServiceUpdateController',
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
            self.serviceService.delete(model).then((response) => {
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
                        return self.checkBoxes[item.serviceId];
                    })
                    .map(item => {
                        return item.serviceId
                    });
                self.serviceService.deleteMulti({ ids: listId }).then((response) => {
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
                self.checkBoxes[item.serviceId] = self.isCheckAll;
            });
        }
    }
}

class ServiceCreateController {
    constructor($uibModalInstance, localeToastrService, serviceService) {
        this.service = {};
        this.serviceService = serviceService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onSubmit() {
        const self = this;
        self.serviceService.create(self.service).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }
}

class ServiceUpdateController {
    constructor($uibModalInstance, localeToastrService, serviceService, tariffService, model, confirmDialog) {
        this.service = model;
        this.serviceService = serviceService;
        this.tariffService = tariffService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.confirmDialog = confirmDialog;

        this.tariff = { serviceId: this.service.serviceId, defaultValue: 'NO' };

        this.loadTariffs();
    }

    loadTariffs() {
        const self = this;
        self.serviceService.getAllTariff(self.service.serviceId)
            .then((response) => {
                self.listTariff = response.data;
            });
    }

    onCreateTariff() {
        const self = this;
        self.tariffService.create(self.tariff).then(response => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.loadTariffs();
            self.tariff = { serviceId: self.service.serviceId, defaultValue: 'NO' };
        })
    }

    onUpdateTariff(tariff) {
        const self = this;
        if (tariff.editting) {
            self.tariffService.update(tariff).then(response => {
                self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
                tariff.editting = false;
                self.loadTariffs();
            })
        } else {
            tariff.editting = true;
        }
    }

    onDeleteTariff(tariff) {
        const self = this;
        self.confirmDialog.confirm('CONFIRM.DELETE').then(() => {
            self.tariffService.delete(tariff).then((response) => {
                self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                self.loadTariffs();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.COMMON.DELETE_FAIL');
            });
        }, () => { });
    }

    onSubmit() {
        const self = this;
        self.serviceService.update(self.service).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON.UPDATE_FAIL');
        });
    }
}

ServiceController.$inject = ['$uibModal', 'serviceService', 'confirmDialog', 'localeToastrService'];
ServiceCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'serviceService'];
ServiceUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'serviceService', 'tariffService', 'model', 'confirmDialog'];

export { ServiceController, ServiceCreateController, ServiceUpdateController }
