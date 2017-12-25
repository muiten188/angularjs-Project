import angular from 'angular';

class AccountType {
    constructor() {
        this.restrict = 'E';
        this.require = 'ngModel';
        this.scope = {
            accountType: '=ngModel',
            smClass: '@',
            smRequired: '@',
            smPlaceHolder: '@',
            smReadonly: '@ngReadonly'
        };
        this.template = require('./index.html');
    }
}

export default AccountType;

