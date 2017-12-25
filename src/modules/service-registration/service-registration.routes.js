routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('service-registration', {
      url: '/service-registration',
      template: require('./view/index.html'),
      controller: 'ServiceRegistrationController',
      controllerAs: 'ctrl'
    })
    .state('service-registration-create', {
      url: '/service-registration/create',
      template: require('./view/form.html'),
      controller: 'ServiceRegistrationCreateController',
      controllerAs: 'ctrl'
    })
    .state('service-registration-update', {
      url: '/service-registration/:serviceRequestId',
      template: require('./view/form.html'),
      params: {
        model: null
      },
      controller: 'ServiceRegistrationUpdateController',
      controllerAs: 'ctrl'
    });
}