routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('importdata', {
      url: '/importdata',
      template: require('./view/index.html'),
      controller: 'DataImportController',
      controllerAs: 'ctrl'
    })
}