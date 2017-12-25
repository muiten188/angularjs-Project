routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('service', {
      url: '/service',
      template: require('./view/index.html'),
      controller: 'ServiceController',
      controllerAs: 'ctrl'
    });
}
