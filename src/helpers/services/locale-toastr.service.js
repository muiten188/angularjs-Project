import angular from 'angular';

class LocaleToastrService {
    constructor($translate, toastr) {
        this.$translate = $translate;
        this.toastr = toastr;

        this.settings = {
            closeButton: true,
            timeOut: 3000
        }
    }

    info(key, params) {
        var self = this;
        if (params) {
            self.$translate(key, params).then(function (translatedValue) {
                self.toastr.info(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.info(translationId, "", self.settings);
            });
        } else {
            self.$translate(key).then(function (translatedValue) {
                self.toastr.info(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.info(translationId, "", self.settings);
            });
        }
    }

    success(key, params) {
        var self = this;
        if (params) {
            self.$translate(key, params).then(function (translatedValue) {
                self.toastr.success(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.success(translationId, "", self.settings);
            });
        } else {
            self.$translate(key).then(function (translatedValue) {
                self.toastr.success(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.success(translationId, "", self.settings);
            });
        }
    }
    
    warning(key, params) {
        var self = this;
        if (params) {
            self.$translate(key, params).then(function (translatedValue) {
                self.toastr.warning(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.warning(translationId, "", self.settings);
            });
        } else {
            self.$translate(key).then(function (translatedValue) {
                self.toastr.warning(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.warning(translationId, "", self.settings);
            });
        }
    }

    error(key, params) {
        var self = this;
        if (params) {
            self.$translate(key, params).then(function (translatedValue) {
                self.toastr.error(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.error(translationId, "", self.settings);
            });
        } else {
            self.$translate(key).then(function (translatedValue) {
                self.toastr.error(translatedValue, "", self.settings);
            }, function (translationId) {
                self.toastr.error(translationId, "", self.settings);
            });
        }
    }

}

LocaleToastrService.$inject = ['$translate', 'toastr'];

export default angular.module('app.localeToastrService', [])
    .service('localeToastrService', LocaleToastrService)
    .name;