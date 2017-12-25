import angular from 'angular';

class YesNo {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            ngValue: '<',
        };
        this.template = '<span>{{ ngValue === "YES" ? "LABEL.COMMON.YES" : "LABEL.COMMON.NO" | translate }}</span>';
    }
}

export default YesNo;