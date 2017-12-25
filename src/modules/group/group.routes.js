routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('group', {
      url: '/group',
      template: require('./view/index.html'),
      controller: 'GroupController',
      controllerAs: 'ctrl'
    });
}