routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('apartment', {
      url: '/apartment',
      template: require('./view/index.html'),
      controller: 'ApartmentController',
      controllerAs: 'ctrl'
    });
}