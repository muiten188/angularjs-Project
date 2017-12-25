routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('resident', {
      url: '/resident',
      template: require('./view/index.html'),
      controller: 'ResidentController',
      controllerAs: 'ctrl'
    })
    .state('resident-create', {
      url: '/resident/create',
      template: require('./view/form.html'),
      controller: 'ResidentCreateController',
      controllerAs: 'ctrl'
    })
    .state('resident-update', {
      url: '/resident/:residentId',
      template: require('./view/form.html'),
      controller: 'ResidentUpdateController',
      controllerAs: 'ctrl'
    })
    .state('resident-import', {
      url: '/resident/import',
      template: require('./view/import.html'),
      controller: 'ResidentImportController',
      controllerAs: 'ctrl'
    });
}