class LoginController {
    constructor($window, localeToastrService, userService, contextValueService) {
        this.$window = $window;
        this.userService = userService;
        this.contextValueService = contextValueService;
        this.localeToastrService = localeToastrService;
    }

    onSubmit(e) {
        const self = this;
        self.userService.login(self.user).then((response) => {
            self.contextValueService.setStorage("userContext", angular.toJson(response.data));
            self.$window.location.href = './';
        }, (error) => {
            self.localeToastrService.error('MESSAGE.LOGIN_USER_FAIL');
        });
    }
}

class ForgetPasswordController {
    constructor($state,$timeout, $window, localeToastrService, userService, contextValueService) {
        this.$window = $window;
        this.$state = $state;
        this.$timeout = $timeout;
        this.userService = userService;
        this.contextValueService = contextValueService;
        this.localeToastrService = localeToastrService;
    }

    onSubmit(e) {
        const self = this;
        self.userService.forgetPassword(self.user).then((response) => {
            self.contextValueService.setStorage("userContext", angular.toJson(response.data));
            self.localeToastrService.success('MESSAGE.LOGIN_RETRIEVE_PASSWORD_SUCCESS');
            self.$timeout(() => {
                self.$state.go('login');
            }, 2000);

        }, (error) => {
            self.localeToastrService.error('MESSAGE.LOGIN_RETRIEVE_PASSWORD_FAIL');
        });
    }
}

LoginController.$inject = ['$window', 'localeToastrService', 'userService', 'contextValueService'];
ForgetPasswordController.$inject = ['$state','$timeout', '$window', 'localeToastrService', 'userService', 'contextValueService'];

export default {
    LoginController,
    ForgetPasswordController
}