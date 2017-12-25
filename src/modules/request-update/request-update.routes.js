routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('request-update', {
      url: '/request-update',
      template: require('./view/index.html'),
      controller: 'requestUpdateController',
      controllerAs: 'ctrl'
    });
}