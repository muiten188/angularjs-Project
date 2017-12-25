routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('test', {
      url: '/test',
      template: require('./view/index.html'),
      controller: 'TestController',
      controllerAs: 'ctrl'
    });
}