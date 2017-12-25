class RequestUpdateController {
    constructor($uibModal, requestUpdateService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.requestUpdateService = requestUpdateService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.requestUpdate = {};
        self.requestUpdate.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.requestUpdate = self.requestUpdate || {};
        self.requestUpdate.currentPage = paging.pageIndex || self.currentPage || 1;
        self.requestUpdate.sort = paging.sort || self.sort || '';
        self.requestUpdateService.search(self.requestUpdate).then((response) => {
            self.currentPage = self.requestUpdate.currentPage;
            self.sort = self.requestUpdate.sort;
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
            controller: 'StaffCreateController',
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
            controller: 'StaffUpdateController',
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
        self.confirmDialog.confirm('CONFIRM.DELETE_STAFF').then(() => {
            self.requestUpdateService.delete(model).then((response) => {
                self.localeToastrService.success('MESSAGE.DELETE_STAFF_SUCCESS');
                self.onSearch();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.DELETE_STAFF_FAIL');
            });

        }, () => { });
    }

    onDeleteMulti() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.DELETE_STAFFS').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.residentId];
                    })
                    .map(item => {
                        return item.residentId
                    });
                self.requestUpdateService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.DELETE_STAFF_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.DELETE_STAFF_FAIL');
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

class RequestUpdateCreateController {
    constructor($uibModalInstance, localeToastrService, requestUpdateService, uploadService, roleGroupService) {
        this.staff = {};
        this.staff.birthday = moment();
        this.requestUpdateService = requestUpdateService;
        this.uploadService = uploadService;
        this.roleGroupService = roleGroupService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.onInit();
    }

    onInit() {
        const self = this;
    }

    onSubmit() {
        const self = this;
        self.requestUpdateService.create(self.requestUpdate).then((response) => {
            self.localeToastrService.success('MESSAGE.CREATE_STAFF_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.CREATE_STAFF_FAIL');
        });
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.uploadService.uploadStaff(file).then(function (resp) {
                self.requestUpdate.avatar = resp.data.path;
            }, null, function (evt) {
            });
        }
    }
}

class RequestUpdateUpdateController {
    constructor($uibModalInstance, localeToastrService, requestUpdateService, uploadService, roleGroupService, model) {
        this.staff = model;

        this.requestUpdateService = requestUpdateService;
        this.uploadService = uploadService;
        this.roleGroupService = roleGroupService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        // this.onInit();
    }

    onInit() {
        const self = this;
        self.roleGroupService.getAll().then(response => {
            self.listRoleGroup = response.data;
        }, () => { });
        self.requestUpdateService.getById(self.requestUpdate.residentId).then(response => {
            self.requestUpdate = response.data;
        });
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.uploadService.uploadStaff(file).then(function (resp) {
                self.requestUpdate.avatar = resp.data.path;
            }, null, function (evt) {
            });
        }
    }

    onSubmit() {
        const self = this;
        self.requestUpdateService.update(self.requestUpdate).then((response) => {
            self.localeToastrService.success('MESSAGE.UPDATE_STAFF_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.UPDATE_STAFF_FAIL');
        });
    }
}

RequestUpdateController.$inject = ['$uibModal', 'requestUpdateService', 'confirmDialog', 'localeToastrService'];
RequestUpdateCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'requestUpdateService', 'uploadService', 'roleGroupService'];
RequestUpdateUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'requestUpdateService', 'uploadService', 'roleGroupService', 'model'];

export { RequestUpdateController, RequestUpdateCreateController, RequestUpdateUpdateController }