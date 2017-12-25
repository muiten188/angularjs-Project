routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('user', {
      url: '/user',
      template: require('./view/index.html'),
      controller: 'UserController',
      controllerAs: 'ctrl'
    });
}