import angular from 'angular';
import modal from 'angular-ui-bootstrap/src/modal';
import carousel from 'angular-ui-bootstrap/src/carousel';

class PictureDialog {
    constructor($uibModal) {
        this.$uibModal = $uibModal;

        this.defaultConfigs = {
            index: 0,
            pictures: [],
            interval: 3000,
            urlName: 'path'
        };
    }

    showDialog(configs) {
        const self = this;
        return self.$uibModal.open({
            template: require('./index.html'),
            controller: ['$uibModalInstance', function ($uibModalInstance) {
                const modalCtrl = this;
                modalCtrl.ok = function () {
                    $uibModalInstance.close("ok");
                }
                modalCtrl.configs = Object.assign(self.defaultConfigs, configs);
            }],
            controllerAs: 'ctrl'
        }).result;
    }

}

PictureDialog.$inject = ['$uibModal'];

export default angular.module('app.services.pictureDialog', [modal, carousel])
    .service('pictureDialog', PictureDialog)
    .name;