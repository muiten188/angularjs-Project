routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('floor', {
      url: '/floor',
      template: require('./view/index.html'),
      controller: 'FloorController',
      controllerAs: 'ctrl'
    });
}