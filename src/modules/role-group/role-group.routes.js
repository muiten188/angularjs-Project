routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('role-group', {
      url: '/role-group',
      template: require('./view/index.html'),
      controller: 'RoleGroupController',
      controllerAs: 'ctrl'
    });
}