appI18n.$inject = ['$translateProvider'];

export default function appI18n($translateProvider) {
    
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');

    let currentLanguage = localStorage.getItem('currentLanguage');

    if (!currentLanguage) {
        currentLanguage = 'vi';
    }
    
    $translateProvider.preferredLanguage(currentLanguage);
}