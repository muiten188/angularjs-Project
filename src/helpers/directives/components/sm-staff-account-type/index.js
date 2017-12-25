import angular from 'angular';

class StaffAccountType {
    constructor() {
        this.restrict = 'E';
        this.require = 'ngModel';
        this.scope = {
            staffAccountType: '=ngModel',
            smClass: '@',
            smRequired: '@',
            smPlaceHolder: '@',
            smReadonly: '@ngReadonly'
        };
        this.template = require('./index.html');
    }
}

export default StaffAccountType;

