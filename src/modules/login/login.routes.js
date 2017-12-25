loginRoutes.$inject = ['$stateProvider'];

export default function loginRoutes($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: require('./view/login.html'),
            controller: 'LoginController',
            controllerAs: 'ctrl'
        })
        .state('forget-password', {
            url: '/forget-password',
            template: require('./view/forget-password.html'),
            controller: 'ForgetPasswordController',
            controllerAs: 'ctrl'
        });

}