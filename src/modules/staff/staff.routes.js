routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('staff', {
      url: '/staff',
      template: require('./view/index.html'),
      controller: 'StaffController',
      controllerAs: 'ctrl'
    });
}