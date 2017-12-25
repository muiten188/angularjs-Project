class InvoiceController {
    constructor($uibModal, $filter, invoiceService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.$filter = $filter;
        self.invoiceService = invoiceService;

        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.invoice = {};
        self.invoice.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.invoice = self.invoice || {};
        self.invoice.currentPage = paging.pageIndex || self.currentPage || 1;
        self.invoice.sort = paging.sort || self.sort || '';
        self.invoiceService.search(self.invoice).then((response) => {
            self.currentPage = self.invoice.currentPage;
            self.sort = self.invoice.sort;
            self.datasource = response.data;
        }, () => { });

        self.isCheckAll = false;
        self.checkBoxes = [];
    }

    onMonthChange() {
        var self = this;
        self.invoice.month = self.invoice.monthDate ? self.$filter('date')(self.invoice.monthDate, "MM/yyyy") : '';
    }

    onGenerateInvoices() {
        var self = this;
        self.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/generate.html'),
            controller: 'InvoiceGenerateController',
            controllerAs: 'ctrl'
        }).result.then(() => {
            self.onSearch();
        }, () => { });
    }

    onUpdateInvoices() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.UPDATE').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.invoiceId];
                    })
                    .map(item => {
                        return item.invoiceId
                    });
                self.invoiceService.updateMultiInvoice({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.COMMON.UPDATE_SUCCESS');
                });
            }, () => { });
        }
    }

    onPublishInvoices() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.PUBLISH').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.invoiceId];
                    })
                    .map(item => {
                        return item.invoiceId
                    });
                self.invoiceService.publishMultiInvoice({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.COMMON.PUBLISH_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    self.localeToastrService.error('MESSAGE.COMMON.PUBLISH_FAIL');
                });
            }, () => { });
        }
    }

    onUpdate(model) {
        var self = this;
        self.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/form.html'),
            controller: 'InvoiceUpdateController',
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
                self.checkBoxes[item.invoiceId] = self.isCheckAll;
            });
        }
    }
}

class InvoiceGenerateController {
    constructor($uibModalInstance, $filter, localeToastrService, invoiceService) {
        this.$filter = $filter;
        this.invoiceService = invoiceService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onSubmit() {
        const self = this;
        const month = self.monthDate ? self.$filter('date')(self.monthDate, "MM/yyyy") : '';
        self.invoiceService.generateInvoice({month: month}).then(response => {
            self.localeToastrService.success('MESSAGE.COMMON.GENERATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, () => { });
    }

}

class InvoiceUpdateController {
    constructor($uibModalInstance, localeToastrService, invoiceService, model) {
        this.invoice = model;
        this.invoiceService = invoiceService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;

        this.onInit();
    }

    onInit() {
        const self = this;
        self.invoiceService.getById(self.invoice.invoiceId).then(response => {
            this.invoice = response.data;
        });
    }

    onSubmit() {
        const self = this;
        self.invoiceService.updateInvoice(self.invoice.invoiceId).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.invoice.invoiceId = response.data;
            self.onInit();
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON.UPDATE_FAIL');
        });
    }
}

InvoiceController.$inject = ['$uibModal', '$filter', 'invoiceService', 'confirmDialog', 'localeToastrService'];
InvoiceGenerateController.$inject = ['$uibModalInstance', '$filter', 'localeToastrService', 'invoiceService'];
InvoiceUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'invoiceService', 'model'];

export { InvoiceController, InvoiceGenerateController, InvoiceUpdateController }