routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('request-change', {
      url: '/request-change',
      template: require('./view/index.html'),
      controller: 'RequestChangeController',
      controllerAs: 'ctrl'
    });
}