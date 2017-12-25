routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('conversation', {
      url: '/conversation',
      template: require('./view/index.html'),
      controller: 'ConversationController',
      controllerAs: 'ctrl'
    });
}