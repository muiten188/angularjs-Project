import angular from 'angular';

class TreeNode {
    constructor($compile) {
        this.$compile = $compile;
        this.restrict = 'E';
        this.replace = true;
        this.require = '^^treeView';
        this.scope = {
            node: '<',
            ngModel: '=',
            useCheckbox: '@'
        };
        this.template = require('./view/tree-node.html');
    }

    compile(tElement, tAttr, transclude) {
        const self = this;
        var contents = tElement.contents().remove();
        var compiledContents;

        return (scope, element, attributes, controller) => {
            scope.onCheck = function () {
                controller.checkNode(scope.node, scope.node.check);
            }

            scope.$watch(function() {
                return scope.node.indeterminate;
            }, function(value) {
                element[0].querySelector('.node-checkbox').indeterminate = value;
            });

            if (!compiledContents) {
                compiledContents = self.$compile(contents);
            }

            compiledContents(scope, (clone, scope) => {
                element.append(clone);
            });
        };
    }

}

export default TreeNode;