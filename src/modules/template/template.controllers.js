class TemplateController {
    constructor($uibModal, templateService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.templateService = templateService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.template = {};
        self.template.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.template = self.template || {};
        self.template.currentPage = paging.pageIndex || self.currentPage || 1;
        self.template.sort = paging.sort || self.sort || '';
        self.templateService.search(self.template).then((response) => {
            self.currentPage = self.template.currentPage;
            self.sort = self.template.sort;
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
            controller: 'TemplateCreateController',
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
            controller: 'TemplateUpdateController',
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
            self.templateService.delete(model).then((response) => {
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
                        return self.checkBoxes[item.templateId];
                    })
                    .map(item => {
                        return item.templateId
                    });
                self.templateService.deleteMulti({ ids: listId }).then((response) => {
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
                self.checkBoxes[item.templateId] = self.isCheckAll;
            });
        }
    }
}

class TemplateCreateController {
    constructor($uibModalInstance, localeToastrService, templateService) {
        this.template = { templateGroup: 'ADMIN' };
        this.templateService = templateService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onSubmit() {
        const self = this;
        self.templateService.create(self.template).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }

}

class TemplateUpdateController {
    constructor($uibModalInstance, localeToastrService, templateService, model) {
        this.template = model;
        this.templateService = templateService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.onInit();
    }

    onInit() {
        const self = this;
        self.templateService.getById(self.template.templateId)
            .then(response => {
                self.template = response.data;
            });
    }

    onSubmit() {
        const self = this;
        self.templateService.update(self.template).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON_UPDATE_FAIL');
        });
    }
}

TemplateController.$inject = ['$uibModal', 'templateService', 'confirmDialog', 'localeToastrService'];
TemplateCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'templateService'];
TemplateUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'templateService', 'model'];

export { TemplateController, TemplateCreateController, TemplateUpdateController }