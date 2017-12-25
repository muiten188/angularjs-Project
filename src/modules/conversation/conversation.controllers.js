class ConversationController {
    constructor($uibModal, conversationService, buildingService, floorService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.conversationService = conversationService;
        self.buildingService = buildingService;
        self.floorService = floorService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.conversation = {};
        self.conversation.pageSize = 20;

        self.datasource = {};

        self.onInit();

        self.onSearch();
    }

    onInit() {
        let self = this;
        self.selectedBuilding = { code: '', placeholder: 'LABEL.COMMON.BUILDING' };
        self.buildingService.getAll().then(response => {
            self.listBuilding = response.data || [];
            self.listBuilding.unshift(self.selectedBuilding);
        }, () => { });
    }

    onBuildingSelected($item) {
        const self = this;
        self.conversation.buildingCode = self.selectedBuilding.code;
        if (self.selectedBuilding.buildingId) {
            self.floorService.findByBuildingId(self.selectedBuilding.buildingId).then(response => {
                self.listFloor = response.data;
            }, () => { });
        }
        else {
            self.listFloor = [];
        }
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.conversation = self.conversation || {};
        self.conversation.currentPage = paging.pageIndex || self.currentPage || 1;
        self.conversation.sort = paging.sort || self.sort || '';
        self.conversationService.search(self.conversation).then((response) => {
            self.currentPage = self.conversation.currentPage;
            self.sort = self.conversation.sort;
            self.datasource = response.data;
        }, () => { });
    }

    onUpdate(model) {
        var self = this;
        self.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./view/form.html'),
            controller: 'ConversationUpdateController',
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

class ConversationUpdateController {
    constructor($uibModalInstance, localeToastrService, conversationService, model) {
        this.conversation = model;
        this.conversationService = conversationService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;

        this.onInit();
    }

    onInit() {
        const self = this;
        self.conversationService.getDetail(self.conversation)
            .then(response => {
                self.conversation = Object.assign(self.conversation, response.data);
            });
    }

    onCancel() {
        this.$uibModalInstance.close('cancel');
    }

    onReply() {
        const self = this;
        self.conversationService.reply(
            {
                conversationId : self.conversation.conversationId,
                conversationDetailContent:self.conversation.conversationDetailContent
            }).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');

            self.conversationService.getDetail(self.conversation)
                .then(cresponse => {
                    self.conversation = Object.assign(self.conversation, cresponse.data);
                });
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON_UPDATE_FAIL');
        });
    }

    onSubmit() {
        const self = this;
        self.conversationService.update(self.conversation).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON_UPDATE_FAIL');
        });
    }
}

ConversationController.$inject = ['$uibModal', 'conversationService', 'buildingService', 'floorService', 'confirmDialog', 'localeToastrService'];
ConversationUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'conversationService', 'model'];

export { ConversationController, ConversationUpdateController }