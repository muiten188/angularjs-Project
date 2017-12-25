routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('building', {
      url: '/building',
      template: require('./view/index.html'),
      controller: 'BuildingController',
      controllerAs: 'ctrl'
    });
}