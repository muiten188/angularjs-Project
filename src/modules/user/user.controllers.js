class UserController {
    constructor($uibModal, userService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.userService = userService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.user = {};
        self.user.pageSize = 20;
        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.user = self.user || {};
        self.user.pageIndex = paging.pageIndex || self.currentPage || 1;
        self.user.sort = paging.sort || self.sort || '';
        self.userService.search(self.user).then((response) => {
            self.currentPage = self.user.pageIndex;
            self.sort = self.user.sort;
            self.datasource = response.data;
        }, () => {});
    }

    onUpdate(model) {
        var self = this;
        self.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/form.html'),
            controller: 'UserUpdateController',
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
            self.userService.delete(model).then((response) => {
                self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                self.onSearch();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.COMMON.DELETE_FAIL');
            });

        }, () => { });
    }
}

class UserUpdateController {
    constructor($uibModal, confirmDialog, localeToastrService, userService) {
        this.$uibModal = $uibModal;
        this.confirmDialog = confirmDialog;
        this.userService = userService;
        this.localeToastrService = localeToastrService;
        // this.onInit();
    }

    onInit() {
        const self = this;
        self.userService.getById(self.userId).then(response => {
            self.user = response.data;
            self.userService.findByUserId(self.$stateParams.userId).then(aresponse => {
                self.user.listUserApartment = aresponse.data.map(item => {
                    return {
                        ...item, name: item.apartmentCode
                    }
                });
                console.log(self.user);
            });
        });
    }

    onSubmit() {
        const self = this;
        self.userService.update(self.user).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON.UPDATE_FAIL');
        });
    }

}

UserController.$inject = ['$uibModal', 'userService', 'confirmDialog', 'localeToastrService'];
UserUpdateController.$inject = ['$uibModal', 'confirmDialog', 'localeToastrService', 'userService'];

export default {
    UserController, UserUpdateController
}