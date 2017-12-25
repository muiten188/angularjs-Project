routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('info', {
      url: '/info',
      template: require('./view/index.html'),
      controller: 'InfoController',
      controllerAs: 'ctrl'
    });
}
