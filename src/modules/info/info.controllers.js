class InfoController {
    constructor($uibModal, infoService, confirmDialog, localeToastrService) {
        let self = this;
        self.$uibModal = $uibModal;
        self.infoService = infoService;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;

        self.currentPage = 1;
        self.sort = "";

        self.info = {};
        self.info.pageSize = 20;

        self.datasource = {};

        self.isCheckAll = false;
        self.checkBoxes = [];

        self.onSearch();
    }

    onSearch(paging) {
        var self = this;
        paging = paging || {};
        self.info = self.info || {};
        self.info.currentPage = paging.pageIndex || self.currentPage || 1;
        self.info.sort = paging.sort || self.sort || '';
        self.infoService.search(self.regulation).then((response) => {
            self.currentPage = self.info.currentPage;
            self.sort = self.info.sort;
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
            template: require('./view/create.html'),
            controller: 'InfoCreateController',
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
            template: require('./view/update.html'),
            controller: 'InfoUpdateController',
            controllerAs: 'ctrl',
            resolve: {
                model: function () {
                    // return angular.copy(model);
                    var obj ={};
                    obj.regulationId =model.regulationId;
                    obj.regulationCategory= model.regulationCategory;
                    obj.regulationSubCategory= model.regulationSubCategory;
                    obj.title= model.title;
                    obj.content = model.content;
                    return obj;
                }
            }
        }).result.then(() => {
            self.onSearch();
        }, () => { });
    }

    onDelete(model) {
        var self = this;
        self.confirmDialog.confirm('CONFIRM.DELETE').then(() => {
            self.infoService.delete(model).then((response) => {
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
                        return self.checkBoxes[item.regulationId];
                    })
                    .map(item => {
                        return item.regulationId
                    });
                self.infoService.deleteMulti({ ids: listId }).then((response) => {
                    self.localeToastrService.success('MESSAGE.COMMON.DELETE_SUCCESS');
                    self.onSearch();
                }, function (error) {
                    console.log(erro)
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
                self.checkBoxes[item.regulationId] = self.isCheckAll;
            });
        }
    }
}

class InfoCreateController {
    constructor($uibModalInstance, localeToastrService, infoService) {
        this.regulation = {};
        this.infoService = infoService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
    }

    onSubmit() {
        const self = this;
        self.infoService.create(self.regulation).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.CREATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, function (error) {
            self.localeToastrService.error('MESSAGE.COMMON.CREATE_FAIL');
        });
    }
    
    onChooseFileClick(id) {
        document.getElementById(id).click();
      }

      onInputFileChange(listFile, inputType) {
        
        //this.uploadFiles(listFile, inputType);
      }
      
      uploadFiles(files, inputType) {
        const self = this;
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            self.file = files[i];
            if (!self.file.$error) {
              self.uploadService
                .uploadFileServiceResgitaion(self.file, inputType)
                .then(
                  function(resp, status, headers, config) {
                    self.serviceRegistration.attachmentFiles.push(resp.data);
                    resp.config.data.file.uploadId = resp.data.uploadId;
                  },
                  null,
                  function(evt) {
                    console.log(evt);
                  }
                );
            }
          }
        }
      }

      onRemoveFile(file, listFile,inputDomId) {
        const self = this;
        document.getElementById(inputDomId).value='';
        listFile.splice(listFile.indexOf(file),1)
        self.serviceRegistrationService
          .deleteFileAttachment(file.uploadId)
          .then(function(resp) {
            listFile.splice(listFile.indexOf(file),1)
          }, null, function(evt) {
            console.log(evt);
          });
      }
}

class InfoUpdateController {
    constructor($uibModalInstance, localeToastrService, infoService, model, confirmDialog) {
        this.regulation = model;
        this.infoService = infoService;
        this.localeToastrService = localeToastrService;
        this.$uibModalInstance = $uibModalInstance;
        this.confirmDialog = confirmDialog;
    }

    onSubmit() {
        const self = this;
        self.infoService.update(self.regulation).then((response) => {
            self.localeToastrService.success('MESSAGE.COMMON.UPDATE_SUCCESS');
            self.$uibModalInstance.close('saved');
        }, (error) => {
            self.localeToastrService.error('MESSAGE.COMMON.UPDATE_FAIL');
        });
    }

    onChooseFileClick(id) {
        document.getElementById(id).click();
      }

      onInputFileChange(listFile, inputType) {
        
        this.uploadFiles(listFile, inputType);
      }
      
      uploadFiles(files, inputType) {
        const self = this;
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            self.file = files[i];
            if (!self.file.$error) {
              self.uploadService
                .uploadFileServiceResgitaion(self.file, inputType)
                .then(
                  function(resp, status, headers, config) {
                    //self.serviceRegistration.attachmentFiles.push(resp.data);
                    resp.config.data.file.uploadId = resp.data.uploadId;
                  },
                  null,
                  function(evt) {
                    console.log(evt);
                  }
                );
            }
          }
        }
      }

      onRemoveFile(file, listFile,inputDomId) {
        const self = this;
        document.getElementById(inputDomId).value='';
        listFile.splice(listFile.indexOf(file),1)
        self.serviceRegistrationService
          .deleteFileAttachment(file.uploadId)
          .then(function(resp) {
            listFile.splice(listFile.indexOf(file),1)
          }, null, function(evt) {
            console.log(evt);
          });
      }
}

InfoController.$inject = ['$uibModal', 'infoService', 'confirmDialog', 'localeToastrService'];
InfoCreateController.$inject = ['$uibModalInstance', 'localeToastrService', 'infoService'];
InfoUpdateController.$inject = ['$uibModalInstance', 'localeToastrService', 'infoService', 'model', 'confirmDialog'];

export { InfoController, InfoCreateController, InfoUpdateController }
