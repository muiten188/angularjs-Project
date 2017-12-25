class GroupController {
    constructor($uibModal, groupService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.groupService = groupService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.group = {};
        self.group.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.group = self.group || {};
        self.group.currentPage = paging.pageIndex || self.currentPage || 1;
        self.group.sort = paging.sort || self.sort || '';
        self.groupService.search(self.group).then((response) => {
            self.currentPage = self.group.currentPage;
            self.sort = self.group.sort;
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
            controller: 'GroupCreateController',
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
            controller: 'GroupUpdateController',
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
            self.groupService.delete(model).then((response) => {
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
                        return self.checkBoxes[item.groupId];
                    })
                    .map(item => {
                        return item.groupId
                    });
                self.groupService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.COMMON.DELETE_SUCCESS');
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
                self.checkBoxes[item.groupId] = self.isCheckAll;
            });
        }
    }
}

class GroupCreateController {
    constructor($uibModalInstance, localeToastrService, groupService, apartmentService) {
        this.group = {};
        this.groupService = groupService;
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    refreshApartments(search) {
        const self = this;
        self.apartmentService.searchByText({ search: search })
            .then(response => {
                self.availableApartments = response.data;
            });
    }

    onSubmit() {
        const self = this;
        self.group.apartmentIdMembers = self.apartmentList ? self.apartmentList.map(item => { return item.apartmentId; }) : [];
        self.groupService.create(self.group).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }
}

class GroupUpdateController {
    constructor($uibModalInstance, localeToastrService, groupService, apartmentService, model) {
        this.group = model;
        this.groupService = groupService;
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;

        this.onInit();
    }

    onInit() {
        const self = this;
        self.apartmentService.findByGroupId(self.group.groupId)
            .then(response => {
                self.apartmentList = response.data;
            });
    }

    refreshApartments(search) {
        const self = this;
        self.apartmentService.searchByText({ search: search })
            .then(response => {
                self.availableApartments = response.data;
            });
    }

    onSubmit() {
        const self = this;
        self.group.apartmentIdMembers = self.apartmentList ? self.apartmentList.map(item => { return item.apartmentId; }) : [];
        self.groupService.update(self.group).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }
}

GroupController.$inject = ['$uibModal', 'groupService', 'confirmDialog', 'localeToastrService'];
GroupCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'groupService', 'apartmentService'];
GroupUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'groupService', 'apartmentService', 'model'];

export { GroupController, GroupCreateController, GroupUpdateController }