routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      template: require('./view/index.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    });
}