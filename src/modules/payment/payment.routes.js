routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('payment', {
      url: '/payment',
      template: require('./view/index.html'),
      controller: 'PaymentController',
      controllerAs: 'ctrl'
    });
}