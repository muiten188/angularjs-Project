class ApartmentMessageController {
    constructor($uibModal, apartmentMessageService, buildingService, floorService, templateService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.apartmentMessageService = apartmentMessageService;
        self.buildingService = buildingService;
        self.floorService = floorService;
        self.templateService = templateService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.apartMessage = {};
        self.apartMessage.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onInit();
        self.onSearch();
    }

    onInit() {
        let self = this;
        self.selectedBuilding = { building: '', placeholder: 'LABEL.COMMON.BUILDING' };
        self.buildingService.getAll().then(response => {
            self.listBuilding = response.data || [];
            self.listBuilding.unshift(self.selectedBuilding);
        }, () => { });

        self.templateService.getAllActive().then(response => {
            self.listTemplate = response.data ? response.data.filter(item => { return item.templateGroup === 'ADMIN'; }) : [];
        }, () => { });
    }

    onBuildingSelected($item) {
        const self = this;
        self.apartMessage.build = self.selectedBuilding.buildingId;
        self.floorService.findByBuildingId(self.selectedBuilding.buildingId).then(response => {
            self.listFloor = response.data;
        }, () => { });
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.apartMessage = self.apartMessage || {};
        self.apartMessage.currentPage = paging.pageIndex || self.currentPage || 1;
        self.apartMessage.sort = paging.sort || self.sort || '';
        self.apartmentMessageService.search(self.apartMessage).then((response) => {
            self.currentPage = self.apartMessage.currentPage;
            self.sort = self.apartMessage.sort;
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
            controller: 'ApartmentMessageCreateController',
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
            controller: 'ApartmentMessageUpdateController',
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
            self.apartmentMessageService.delete(model).then((response) => {
                self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                self.onSearch();
            }, () => { });
        }, () => { });
    }

    onDeleteMulti() {
        var self = this;
        if (self.checkBoxes && self.checkBoxes.length > 0) {
            self.confirmDialog.confirm('CONFIRM.DELETE').then(() => {
                let listId = self.datasource.data
                    .filter(item => {
                        return self.checkBoxes[item.messageId];
                    })
                    .map(item => {
                        return item.messageId
                    });
                self.apartmentMessageService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                    self.onSearch();
                }, () => { });
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
                self.checkBoxes[item.messageId] = self.isCheckAll;
            });
        }
    }
}

class ApartmentMessageCreateController {
    constructor($uibModalInstance, localeToastrService, apartmentMessageService, apartmentService, groupService, templateService, uploadService) {
        this.apartMessage = {};
        this.apartmentMessageService = apartmentMessageService;
        this.apartmentService = apartmentService;
        this.groupService = groupService;
        this.templateService = templateService;
        this.uploadService = uploadService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.group=[];
        this.apartment=[];
        this.onInit();
    }

    onInit() {
        const self = this;
        self.templateService.getAllActive().then(response => {
            self.listTemplate = response.data ? response.data.filter(item => { return item.templateGroup === 'ADMIN'; }) : [];
        }, () => { });
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.uploadService.uploadApartmentMessage(file).then(function (resp) {
                self.apartMessage.apartMessageAttach = resp.data.path;
            }, null, function (evt) {
            });
        }
    }

    refreshApartments(search) {
        const self = this;
        self.apartmentService.searchByText({ search: search })
            .then(response => {
                self.availableApartments = response.data;
            });
    }

    refreshGroups(search) {
        const self = this;
        self.groupService.searchByText({ search: search })
            .then(response => {
                self.availableGroups = response.data;
            });
    }

    onSubmit() {
        const self = this;
        let arrGroup=[];
        let arrApartment=[];
        // self.apartMessage.apartmentOrGroupId = self.isApartmentGroup
        //     ? self.group.groupId
        //     : self.apartment.apartmentId;
        for(var i=0;i<self.group.length;i++){
            arrGroup.push(self.group[i].groupId)
        }
        for(var i=0;i<self.apartment.length;i++){
            arrApartment.push(self.apartment[i].apartmentId)
        }
        self.apartMessage.groupIds=arrGroup;
        self.apartMessage.apartmentIds=arrApartment;
        self.apartmentMessageService.create(self.apartMessage).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, () => { });
    }
    updateTemplate($select){
        for(var i=0;i<this.listTemplate.length;i++){
            var item = this.listTemplate[i];
            if(item.templateId==$select){
                this.apartMessage.apartMessageTitle = item.templateTitle;
                this.apartMessage.apartMessageContent = item.templateContent;
                break;
            }
            
        }
    }
}

class ApartmentMessageUpdateController {
    constructor($uibModalInstance, localeToastrService, apartmentMessageService, apartmentService, groupService, templateService, uploadService, model) {
        this.apartMessage = model;
        this.apartmentMessageService = apartmentMessageService;
        this.apartmentService = apartmentService;
        this.groupService = groupService;
        this.templateService = templateService;
        this.uploadService = uploadService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;

        this.onInit();
    }

    onInit() {
        const self = this;
        self.apartmentMessageService.getById(self.apartMessage.messageId)
            .then(response => {
                self.apartMessage = response.data;

                if (self.apartMessage.isApartmentGroup) {
                    self.groupService.getById(self.apartMessage.apartMessageGroup).then(gresponse => {
                        self.group = gresponse.data;
                    }, () => { });
                } else {
                    self.apartmentService.getById(self.apartMessage.apartmentId).then(aresponse => {
                        self.apartment = aresponse.data;
                    }, () => { });
                }
            });

        self.templateService.getAllActive().then(response => {
            self.listTemplate = response.data ? response.data.filter(item => { return item.templateGroup === 'ADMIN'; }) : [];
        }, () => { });


    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error) {
            self.uploadService.uploadApartmentMessage(file).then(function (resp) {
                self.apartMessage.apartMessageAttach = resp.data.path;
            }, null, function (evt) {
            });
        }
    }

    refreshApartments(search) {
        const self = this;
        self.apartmentService.searchByText({ search: search })
            .then(response => {
                self.availableApartments = response.data;
            });
    }

    refreshGroups(search) {
        const self = this;
        self.groupService.searchByText({ search: search })
            .then(response => {
                self.availableGroups = response.data;
            });
    }

    onSubmit() {
        const self = this;
        self.apartMessage.apartmentOrGroupId = self.isApartmentGroup
            ? self.group.groupId
            : self.apartment.apartmentId;

        self.apartmentMessageService.update(self.apartMessage).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, () => { });
    }
    updateTemplate($select){
        for(var i=0;i<this.listTemplate.length;i++){
            var item = this.listTemplate[i];
            if(item.templateId==$select){
                this.apartMessage.apartMessageTitle = item.templateTitle;
                this.apartMessage.apartMessageContent = item.templateContent;
                break;
            }
            
        }
    }
}

ApartmentMessageController.$inject = ['$uibModal', 'apartmentMessageService', 'buildingService', 'floorService', 'templateService', 'confirmDialog', 'localeToastrService'];
ApartmentMessageCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'apartmentMessageService', 'apartmentService', 'groupService', 'templateService', 'uploadService'];
ApartmentMessageUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'apartmentMessageService', 'apartmentService', 'groupService', 'templateService', 'uploadService', 'model'];

export { ApartmentMessageController, ApartmentMessageCreateController, ApartmentMessageUpdateController }