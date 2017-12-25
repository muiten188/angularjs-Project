const TABS = {
    //DOWNLOAD_SAMPLE: 0,
    UPLOAD_FILE: 1,
    VERIFY_UPLOAD: 2
}
import APP from "../../config/constants.js";

class DataImportController {
    constructor($uibModal, $location, confirmDialog,
         localeToastrService, 
         $stateParams,
         importDataService 
        ) {
        let self=this;
        self.$uibModal = $uibModal;
        self.$location = $location;
        self.confirmDialog = confirmDialog;
        self.localeToastrService = localeToastrService;
        self.$stateParams = $stateParams;
        self.importDataService=importDataService
        self.currentPage = 1;
        self.sort = "";

        self.resident = {};
        self.resident.pageSize = 20;
        self.data={}
        self.fileTemplateType=null;
        self.datasource = {};

        this.import = { activeTab: TABS.DOWNLOAD_SAMPLE };
    }


    downloadTemplate() {
        const self = this;
        self.import.activeTab = TABS.UPLOAD_FILE;
        self.importDataService.downloadTemplate(this.data.templateType).then(response => {
            window.location =APP.API_PATH +"/"+ response.data.fileUrl;
        });
    }

    uploadFile(file) {
        const self = this;
        if (file && !file.$error && self.fileTemplateType) {
            self.import.activeTab = TABS.VERIFY_UPLOAD;
            self.uploadStatus=true;
            self.datasource={};
            self.importDataService.importDataInput(file,self.fileTemplateType)
            .then(function (response) {
                self.uploadStatus=true;
                self.datasource = response;
                
            }, function (evt) {
                
                self.datasource = {};
                self.uploadStatus=false;
            }, null);
        }
    }
    done(){
        
    }
}

DataImportController.$inject = ['$uibModal', '$location', 'confirmDialog', 'localeToastrService', '$stateParams',"importDataService"];

export { DataImportController }