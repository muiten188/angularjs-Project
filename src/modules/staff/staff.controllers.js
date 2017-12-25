class StaffController {
    constructor($uibModal, staffService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.staffService = staffService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.staff = {};
        self.staff.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.staff = self.staff || {};
        self.staff.currentPage = paging.pageIndex || self.currentPage || 1;
        self.staff.sort = paging.sort || self.sort || '';
        self.staffService.search(self.staff).then((response) => {
            self.currentPage = self.staff.currentPage;
            self.sort = self.staff.sort;
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
            self.staffService.delete(model).then((response) => {
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
                self.staffService.deleteMulti({ ids: listId }).then((response) => {
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
                console.log(self.checkBoxes);
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

class StaffCreateController {
    constructor($uibModalInstance, localeToastrService, staffService, uploadService, roleGroupService) {
        this.staff = {};
        this.staff.birthday = moment();
        this.staffService = staffService;
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
        self.staffService.create(self.staff).then((response) => {
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
                self.staff.avatar = resp.data.path;
            }, null, function (evt) {
            });
        }
    }
}

class StaffUpdateController {
    constructor($uibModalInstance, localeToastrService, staffService, uploadService, roleGroupService, model) {
        this.staff = model;

        this.staffService = staffService;
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
        self.staffService.getById(self.staff.residentId).then(response => {
            self.staff = response.data;
        });
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.uploadService.uploadStaff(file).then(function (resp) {
                self.staff.avatar = resp.data.path;
            }, null, function (evt) {
            });
        }
    }

    onSubmit() {
        const self = this;
        self.staffService.update(self.staff).then((response) => {
            self.localeToastrService.success('MESSAGE.UPDATE_STAFF_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.UPDATE_STAFF_FAIL');
        });
    }
}

StaffController.$inject = ['$uibModal', 'staffService', 'confirmDialog', 'localeToastrService'];
StaffCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'staffService', 'uploadService', 'roleGroupService'];
StaffUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'staffService', 'uploadService', 'roleGroupService', 'model'];

export { StaffController, StaffCreateController, StaffUpdateController }