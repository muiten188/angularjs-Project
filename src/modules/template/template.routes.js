routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('template', {
      url: '/template',
      template: require('./view/index.html'),
      controller: 'TemplateController',
      controllerAs: 'ctrl'
    });
}