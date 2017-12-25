routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('invoice', {
      url: '/invoice',
      template: require('./view/index.html'),
      controller: 'InvoiceController',
      controllerAs: 'ctrl'
    });
}