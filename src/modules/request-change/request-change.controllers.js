class RequestChangeController {
    constructor($uibModal, requestChangeService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.requestChangeService = requestChangeService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.requestChange = {};
        self.requestChange.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.requestChange = self.requestChange || {};
        self.requestChange.currentPage = paging.pageIndex || self.currentPage || 1;
        self.requestChange.sort = paging.sort || self.sort || '';
        self.requestChangeService.search(self.requestChange).then((response) => {
            self.currentPage = self.requestChange.currentPage;
            self.sort = self.requestChange.sort;
            self.datasource = response.data;
        }, () => { });

        self.isCheckAll = false;
        self.checkBoxes = [];
    }

    onShowInfo(model) {
        var self = this;
        this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/new.html'),
            controller: 'RequestChangeCreateController',
            controllerAs: 'ctrl'
        }).result.then(() => {
            self.onSearch();
        }, () => { });
    }

    onAcceptMulti(model) {
        var self = this;
        self.confirmDialog.confirm('CONFIRM.DELETE_REQUEST_CHANGE').then(() => {
            self.requestChangeService.delete(model).then((response) => {
                self.localeToastrService.success('MESSAGE.DELETE_REQUEST_CHANGE_SUCCESS');
                self.onSearch();
            }, function (error) {
                self.localeToastrService.error('MESSAGE.DELETE_REQUEST_CHANGE_FAIL');
            });

        }, () => { });
    }

    onRejectMulti() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.DELETE_REQUEST_CHANGES').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.requestChangeId];
                    })
                    .map(item => {
                        return item.requestChangeId
                    });
                self.requestChangeService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.DELETE_REQUEST_CHANGE_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.DELETE_REQUEST_CHANGE_FAIL');
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
                self.checkBoxes[item.requestChangeId] = self.isCheckAll;
            });
        }
    }
}

class RequestChangeNewController {
    constructor($uibModalInstance, localeToastrService, requestChangeService) {
        this.requestChange = {};
        this.requestChangeService = requestChangeService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onAccept() {
        const self = this;
        self.requestChangeService.create(self.requestChange).then((response) => {
            self.localeToastrService.success('MESSAGE.CREATE_REQUEST_CHANGE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.CREATE_REQUEST_CHANGE_FAIL');
        });
    }

    onReject() {
        const self = this;
        self.requestChangeService.create(self.requestChange).then((response) => {
            self.localeToastrService.success('MESSAGE.CREATE_REQUEST_CHANGE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.CREATE_REQUEST_CHANGE_FAIL');
        });
    }
}

class RequestChangeModifyController {
    constructor($uibModalInstance, localeToastrService, requestChangeService, model) {
        this.requestChange = model;
        this.requestChangeService = requestChangeService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onAccept() {
        const self = this;
        self.requestChangeService.create(self.requestChange).then((response) => {
            self.localeToastrService.success('MESSAGE.CREATE_REQUEST_CHANGE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.CREATE_REQUEST_CHANGE_FAIL');
        });
    }

    onReject() {
        const self = this;
        self.requestChangeService.create(self.requestChange).then((response) => {
            self.localeToastrService.success('MESSAGE.CREATE_REQUEST_CHANGE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.CREATE_REQUEST_CHANGE_FAIL');
        });
    }
}

RequestChangeController.$inject = ['$uibModal', 'requestChangeService', 'confirmDialog', 'localeToastrService'];
RequestChangeNewController.$inject = ['$uibModalInstance', 'localeToastrService', 'requestChangeService', 'model'];
RequestChangeModifyController.$inject = ['$uibModalInstance', 'localeToastrService', 'requestChangeService', 'model'];

export { RequestChangeController, RequestChangeNewController, RequestChangeModifyController }