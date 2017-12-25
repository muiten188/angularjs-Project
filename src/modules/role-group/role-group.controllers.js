import APP_MENU from '../../config/app.menu';

class RoleGroupController {
    constructor($uibModal, roleGroupService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.roleGroupService = roleGroupService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.roleGroup = {};
        self.roleGroup.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.roleGroup = self.roleGroup || {};
        self.roleGroup.currentPage = paging.pageIndex || self.currentPage || 1;
        self.roleGroup.sort = paging.sort || self.sort || '';
        self.roleGroupService.search(self.roleGroup).then((response) => {
            self.currentPage = self.roleGroup.currentPage;
            self.sort = self.roleGroup.sort;
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
            controller: 'RoleGroupCreateController',
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
            controller: 'RoleGroupUpdateController',
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
        self.confirmDialog.confirm('CONFIRM.DELETE_ROLE_GROUP').then(() => {
            self.roleGroupService.delete(model).then((response) => {
                self.localeToastrService.success('MESSAGE.DELETE_ROLE_GROUP_SUCCESS');
                self.onSearch();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.DELETE_ROLE_GROUP_FAIL');
            });

        }, () => { });
    }

    onDeleteMulti() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.DELETE_ROLE_GROUPS').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.roleGroupId];
                    })
                    .map(item => {
                        return item.roleGroupId
                    });
                self.roleGroupService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.DELETE_ROLE_GROUP_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.DELETE_ROLE_GROUP_FAIL');
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
                self.checkBoxes[item.roleGroupId] = self.isCheckAll;
            });
        }
    }
}

class RoleGroupCreateController {
    constructor($uibModalInstance, localeToastrService, roleGroupService) {
        this.roleGroup = {};
        this.checkedRoles = [];
        this.roleGroupService = roleGroupService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;

        this.onInit();
    }

    onInit() {
        const self = this;

        const appMenu = [...APP_MENU];

        const recusiveMapping = (node, fileNode) => {
            return {
                title: node.name,
                value: '',
                fileNode: fileNode,
                children: node.roles && node.roles.length > 0
                    ? node.roles.map(role => {
                        return {
                            title: role,
                            value: role,
                            fileNode: true,
                            children: []
                        };
                    })
                    : (node.children && node.children.length > 0
                        ? node.children.map(child => { return recusiveMapping(child); })
                        : [])
            };
        }

        self.roleModel = [];
        self.roleData = appMenu.map(menu => {
            return recusiveMapping(menu, false);
        });
    }

    onSubmit() {
        const self = this;
        self.roleGroup.listRoleCode = self.roleModel;
        self.roleGroupService.create(self.roleGroup).then((response) => {
            self.localeToastrService.success('MESSAGE.CREATE_ROLE_GROUP_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.CREATE_ROLE_GROUP_FAIL');
        });
    }
}

class RoleGroupUpdateController {
    constructor($uibModalInstance, localeToastrService, roleGroupService, model) {
        this.roleGroup = model;
        this.roleGroupService = roleGroupService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.onInit();
    }

    onInit() {
        const self = this;

        const appMenu = [...APP_MENU];

        const recusiveMapping = (node, fileNode) => {
            return {
                title: node.name,
                value: '',
                fileNode: fileNode,
                children: node.roles && node.roles.length > 0
                    ? node.roles.map(role => {
                        return {
                            title: role,
                            value: role,
                            fileNode: true,
                            children: []
                        };
                    })
                    : (node.children && node.children.length > 0
                        ? node.children.map(child => { return recusiveMapping(child); })
                        : [])
            };
        }

        self.roleData = appMenu.map(menu => {
            return recusiveMapping(menu, false);
        });

        self.roleGroupService.getById(self.roleGroup.roleGroupId).then(response => {
            self.roleGroup = response.data;
            self.roleModel = self.roleGroup.listRoleGroupDetail.map(item => { return item.code; });
        }, () => { });

    }

    onSubmit() {
        const self = this;
        self.roleGroup.listRoleCode = self.roleModel;
        self.roleGroupService.update(self.roleGroup).then((response) => {
            self.localeToastrService.success('MESSAGE.UPDATE_ROLE_GROUP_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.UPDATE_ROLE_GROUP_FAIL');
        });
    }
}

RoleGroupController.$inject = ['$uibModal', 'roleGroupService', 'confirmDialog', 'localeToastrService'];
RoleGroupCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'roleGroupService'];
RoleGroupUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'roleGroupService', 'model'];

export { RoleGroupController, RoleGroupCreateController, RoleGroupUpdateController }