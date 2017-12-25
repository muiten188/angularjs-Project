import angular from 'angular';

class Description {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            value: '@',
        };
        this.template = require('./index.html');;
    }
}

export default Description;