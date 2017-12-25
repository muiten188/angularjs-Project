routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('apartment-message', {
      url: '/apartment-message',
      template: require('./view/index.html'),
      controller: 'ApartmentMessageController',
      controllerAs: 'ctrl'
    });
}