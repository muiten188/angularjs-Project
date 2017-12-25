appRoutes.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

export default function appRoutes($urlRouterProvider, $locationProvider, $httpProvider) {
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $httpProvider.interceptors.push(['$rootScope', '$q', '$window', '$timeout', '$injector', 'contextValueService', function ($rootScope, $q, $window, $timeout, $injector, contextValueService) {
    return {
      'request': function (config) {
        const userContext = angular.fromJson(contextValueService.getStorage("userContext"));
        config.headers.JSESSIONID = userContext ? userContext.jsessionId : null;
        return config;
      },
      'responseError': function (rejection) {
        const localeToastrService = $injector.get('localeToastrService');
        if (rejection.status === 401) {
          localeToastrService.error('MESSAGE.COMMON.SESSION_TIMEOUT');
          $timeout(() => {
            $window.location.href = './login.html';
          }, 3000);
        }

        if (rejection.status === 403) {
          localeToastrService.error('MESSAGE.COMMON.PERMISSION_DENIED');
        }

        if (rejection.status === 404) {
          localeToastrService.error('MESSAGE.COMMON.PATH_NOT_FOUND');
        }

        if (rejection.status === 500) {
          if (rejection.data && rejection.data.code) {
            localeToastrService.error(rejection.data.code);
          } else {
            localeToastrService.error('MESSAGE.COMMON.INTERNAL_SERVER_ERROR');
          }
        }

        return $q.reject(rejection);
      }
    };
  }
  ]);
}