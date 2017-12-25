appHttp.$inject = ['cfpLoadingBarProvider'];

export default function appHttp(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
}