const PAY_DEBT = 'Debt';

class PaymentController {
    constructor($uibModal, paymentService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.paymentService = paymentService;

        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.payment = {};
        self.payment.pageSize = 20;

        self.datasource = {};

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.payment = self.payment || {};
        self.payment.currentPage = paging.pageIndex || self.currentPage || 1;
        self.payment.sort = paging.sort || self.sort || '';
        self.paymentService.search(self.payment).then((response) => {
            self.currentPage = self.payment.currentPage;
            self.sort = self.payment.sort;
            self.datasource = response.data;
        }, () => { });
    }

    onCreate() {
        var self = this;
        this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/form.html'),
            controller: 'PaymentCreateController',
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
            controller: 'PaymentUpdateController',
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
}

class PaymentCreateController {
    constructor($uibModalInstance, $filter, localeToastrService, paymentService, invoiceService, apartmentService) {
        this.payment = {};
        this.payment.accountBalance = 0;
        this.checkList = [];
        this.paymentService = paymentService;
        this.invoiceService = invoiceService;
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.$filter = $filter;
    }

    refreshApartments(search) {
        const self = this;
        self.apartmentService.searchByText({ search: search })
            .then(response => {
                self.availableApartments = response.data;
            });
    }

    getInvoiceCode() {
        const self = this;
        let apartmentId = self.apartment.apartmentId;
        let month = self.$filter('date')(self.monthDate, "MM/yyyy")
        if (apartmentId && month) {
            self.invoiceService.getInvoiceCode(apartmentId, month).then(rinvoiceId => {
                if (rinvoiceId && rinvoiceId.data) {
                    self.payment.invoiceId = rinvoiceId.data;

                    self.invoiceService.getItemToPayment(self.payment.invoiceId).then(ritem => {
                        self.invoiceDetailItemList = ritem.data.invoiceDetailItemList;
                        self.calculateSum();
                    });
                } else {
                    localeToastrService.error('LABEL.INVOICE.NOT_FOUND');
                }
            })
        }
    }

    calculateSum() {
        const self = this;
        let payDebtObject = self.invoiceDetailItemList.filter(item => { return item.itemName === PAY_DEBT; });

        let payDebt = payDebtObject && payDebtObject.amount ? payDebtObject.amount : 0;
        let payServices = self.invoiceDetailItemList
            .filter(item => {
                return self.checkList[item.invoiceDetailId];
            })
            .reduce((accum, curVal) => {
                return accum + curVal.amount;
            }, 0);
        this.sum = this.payment.paymentAmount - payDebt - payServices;
    }

    onSubmit() {
        const self = this;
        self.payment.apartmentId = self.apartment.apartmentId;
        self.payment.paymentItemList = self.invoiceDetailItemList
            .filter(item => {
                return self.checkList[item.invoiceDetailId];
            })
            .map(item => {
                return {
                    invoiceDetailId: item.invoiceDetailId,
                    paymentAmount: item.amount
                }
            })
        self.paymentService.pay(self.payment).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON_UPDATE_FAIL');
        });
    }
}

class PaymentUpdateController {
    constructor($uibModalInstance, localeToastrService, paymentService, invoiceService, apartmentService, model) {
        this.payment = model;
        this.paymentService = paymentService;
        this.invoiceService = invoiceService;
        this.apartmentService = apartmentService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;

        this.onInit();
    }

    onInit() {
        const self = this;
        self.paymentService.getById(self.payment.paymentId).then(response => {
            this.payment = response.data;
        });
    }

    onSubmit() {
        const self = this;
        self.paymentService.update(self.payment).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON_UPDATE_FAIL');
        });
    }
}

PaymentController.$inject = ['$uibModal', 'paymentService', 'confirmDialog', 'localeToastrService'];
PaymentCreateController.$inject = ['$uibModalInstance', '$filter', 'localeToastrService', 'paymentService', 'invoiceService', 'apartmentService'];
PaymentUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'paymentService', 'invoiceService', 'apartmentService', 'model'];

export { PaymentController, PaymentCreateController, PaymentUpdateController }