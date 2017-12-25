import angular from 'angular';

class TreeView {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            treeData: '<',
            ngModel: '=',
            useCheckbox: '@'
        };
        this.template = require('./view/tree-view.html');
        this.controllerAs = 'ctrl';
        this.controller = ['$scope', function ($scope) {
            const self = this;

            const recusiveFindNode = function (node, value) {
                if (node.value === value)
                    return node;

                if (node.children && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        let found = recusiveFindNode(node.children[i], value);
                        if (found) {
                            return found;
                        }
                    }
                }
                return null;
            }

            const findNode = function (value) {
                if ($scope.treeData && $scope.treeData.length > 0) {
                    for (let i = 0; i < $scope.treeData.length; i++) {
                        let found = recusiveFindNode($scope.treeData[i], value);
                        if (found) {
                            return found;
                        }
                    }
                }
                return null;
            }

            const recusiveAssignParent = function (fNode) {
                if (fNode.children && fNode.children.length > 0) {
                    fNode.children.forEach(child => {
                        child._parent = fNode;
                        recusiveAssignParent(child);
                    });
                }
            }

            const resetRecusive = function (node) {
                node.check = false;
                node.indeterminate = false;
                if (node.children && node.children.length > 0) {
                    node.children.forEach(child => {
                        resetRecusive(child);
                    });
                }
            }

            const resetTreeChecking = function () {
                $scope.treeData.forEach(node => {
                    resetRecusive(node);
                })
            }

            $scope.$watch(() => { return $scope.treeData; }, (value) => {
                $scope.treeData.forEach(node => {
                    recusiveAssignParent(node);
                })
            });

            $scope.$watch('ngModel', (value, old) => {
                if (value) {
                    resetTreeChecking();
                    value.forEach(model => {
                        let node = findNode(model);
                        if (node) {
                            self.checkNode(node, true);
                        }
                    });
                }
            });

            const recusiveCheckDown = function (fNode, checked) {
                fNode.check = checked;
                if (checked) {
                    fNode.indeterminate = false;
                    if (fNode.value && $scope.ngModel.indexOf(fNode.value) < 0) {
                        $scope.ngModel.push(fNode.value);
                    }
                } else {
                    const index = $scope.ngModel.indexOf(fNode.value);
                    if (index >= 0) $scope.ngModel.splice(index, 1);
                }

                if (fNode.children && fNode.children.length > 0) {
                    fNode.children.forEach(child => {
                        recusiveCheckDown(child, checked);
                    });
                }
            }

            const recusiveCheckUp = function (fNode) {
                if (fNode._parent) {
                    fNode._parent.check = !fNode._parent.children.find(child => { return !child.check; });
                    fNode._parent.indeterminate = fNode._parent.children.find(child => { return !child.check; })
                        && fNode._parent.children.find(child => { return child.check | child.indeterminate; }) ? true : false;
                    if (fNode._parent.check || fNode._parent.indeterminate) {
                        if (fNode._parent.value && $scope.ngModel.indexOf(fNode._parent.value) < 0) {
                            $scope.ngModel.push(fNode._parent.value);
                        }
                    } else {
                        const index = $scope.ngModel.indexOf(fNode._parent.value);
                        if (index >= 0) $scope.ngModel.splice(index, 1);
                    }

                    recusiveCheckUp(fNode._parent);
                }
            }

            this.checkNode = function (node, checked) {
                recusiveCheckDown(node, checked);
                recusiveCheckUp(node);
            }
        }];
    }
}

export default TreeView;