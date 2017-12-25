import angular from 'angular';

const values = [
    { value: "OWNER", title: "LABEL.RESIDENT_TYPE.OWNER" },
    { value: "PEOPLE_IN_HOUSE", title: "LABEL.RESIDENT_TYPE.PEOPLE_IN_HOUSE" },
    { value: "RENTER", title: "LABEL.RESIDENT_TYPE.RENTER" },
    { value: "BORROWER", title: "LABEL.RESIDENT_TYPE.BORROWER" },
    { value: "OTHER", title: "LABEL.RESIDENT_TYPE.OTHER" }
    
    
]

class ResidentType {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            residentType: '=ngModel',
            smClass: '@',
            smRequired: '@',
            smPlaceHolder: '@',
            smReadonly: '@ngReadonly',
            smInput: '@',
            ngValue: "<",
            ngChange:'&ngChange'
        };
        this.template = require('./index.html');
    }

    link(scope, elem, attrs) {
        scope.options = values;
        scope.residentTypeValue = '';
        // elem.bind('change', (evt)=> {
        //     var isFirstChild = (evt.target.parentElement.children[0] === evt.target);
        //     if (isFirstChild) {
        //         scope.ngChange();
        //     }
        // });
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.residentTypeValue = found.title;
            }
        });
    }
}

export default ResidentType;