import angular from 'angular';

class ConfirmDialog {
    constructor($translate, $uibModal) {
        this.$translate = $translate;
        this.$uibModal = $uibModal;
    }

    confirm(messageKey) {
        var self = this;
        return self.$uibModal.open({
            template: require('./confirm.html'),
            controller: ['$uibModalInstance', function ($uibModalInstance) {
                const modalCtrl = this;
                modalCtrl.ok = function () {
                    $uibModalInstance.close("ok");
                }
                modalCtrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                }
                self.$translate(messageKey).then(function (translatedValue) {
                    modalCtrl.message = translatedValue;
                }, function (translationId) {
                    modalCtrl.message = translationId;
                });
            }],
            controllerAs: 'ctrl'
        }).result;
    }

}

ConfirmDialog.$inject = ['$translate', '$uibModal'];

export default angular.module('app.services.confirmDialog', [])
    .service('confirmDialog', ConfirmDialog)
    .name;