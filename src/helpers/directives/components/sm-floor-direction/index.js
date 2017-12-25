import angular from 'angular';

const values = [
    { value: "EAST", title: "LABEL.FLOOR.FLOOR_DIRECTION.EAST" },
    { value: "WEST", title: "LABEL.FLOOR.FLOOR_DIRECTION.WEST" },
    { value: "SOUTH", title: "LABEL.FLOOR.FLOOR_DIRECTION.SOUTH" },
    { value: "NORTH", title: "LABEL.FLOOR.FLOOR_DIRECTION.NORTH" },
    { value: "SOUTH_EAST", title: "LABEL.FLOOR.FLOOR_DIRECTION.SOUTH_EAST" },
    { value: "SOUTH_WEST", title: "LABEL.FLOOR.FLOOR_DIRECTION.SOUTH_WEST" },
    { value: "NORTH_EAST", title: "LABEL.FLOOR.FLOOR_DIRECTION.NORTH_EAST" },
    { value: "NORTH_WEST", title: "LABEL.FLOOR.FLOOR_DIRECTION.NORTH_WEST" }
]

class FloorDirection {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            direction: '=ngModel',
            smClass: '@',
            smRequired: '@',
            smPlaceHolder: '@',
            smReadonly: '@ngReadonly',
            smInput: '@',
            ngValue: "<"
        };
        this.template = require('./index.html');
    }

    link(scope, elem, attrs) {
        scope.options = values;

        scope.directionValue = '';
        scope.$watch(function () {
            return scope.ngValue;
        }, function (newValue) {
            const found = values.find(item => { return item.value === newValue });
            if (found) {
                scope.directionValue = found.title;
            }
        });
    }
}

export default FloorDirection;