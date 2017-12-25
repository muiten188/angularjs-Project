class HeaderController {

	constructor($uibModal, $scope, $timeout, $window, $translate, contextValueService, SseFactory) {
		let self = this;
		self.$uibModal = $uibModal;
		self.$scope = $scope;
		self.$timeout = $timeout;
		self.$window = $window;
		self.$translate = $translate;
		self.contextValueService = contextValueService;
		self.sseFactory = SseFactory;

		let currentLanguage = self.contextValueService.getStorage('currentLanguage');
		self.currentLanguage = currentLanguage ? currentLanguage : 'vi';
		let user = JSON.parse(localStorage.userContext) || {};
		self.userName = user.userName || {};
		self.email = user.email || {};
		self.mobile = user.phoneNumber || {};
		self.userType = user.userType || {};

		self.notifications = { data: [], total: 0 };

		// self.sseFactory.connect('http://localhost:8090/test-notification', {
		// 	onMessage: (data) => {
		// 		self.$timeout(() => {
		// 			if (self.notifications.data.length >= 10)
		// 				self.notifications.data.shift();
		// 			self.notifications.data.push({ time: new Date(), title: data });
		// 			self.notifications.total++;
		// 		}, 0);
		// 	}
		// });
	}

	onChangeLanguage(lang) {
		this.contextValueService.setStorage('currentLanguage', lang);
		this.currentLanguage = lang;
		this.$translate.use(lang);
	}

	onLogout() {
		const self = this;
		self.contextValueService.clearStorage();
		self.$window.location.href = './login.html';
	}

	onChangePassword() {
		const self = this;
		self.$uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			size: 'sm',
			template: require('./view/change-password.html'),
			controller: 'ChangePasswordController',
			controllerAs: 'ctrl'
		});
	}

	onShowNotification(notification) {
		var self = this;
		self.$uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			template: require('./view/notification.html'),
			controller: ['$uibModalInstance', function ($uibModalInstance) {
				this.close = () => {
					$uibModalInstance.close('saved');
				}
			}],
			controllerAs: 'ctrl',
			resolve: {
				model: function () {
					return angular.copy(notification);
				}
			}
		}).result.then(() => { }, () => { });
	}

}

class ChangePasswordController {
	constructor($uibModalInstance, localeToastrService, userService) {
		this.$uibModalInstance = $uibModalInstance;
		this.localeToastrService = localeToastrService;
		this.userService = userService;
	}

	onSubmit() {

	}
}

HeaderController.$inject = ['$uibModal', '$scope', '$timeout', '$window', '$translate', 'contextValueService', 'SseFactory'];
ChangePasswordController.$inject = ['$uibModalInstance', 'localeToastrService', 'userService'];

export { HeaderController, ChangePasswordController };