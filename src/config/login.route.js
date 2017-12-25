loginRoutes.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function loginRoutes($urlRouterProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/login');
}