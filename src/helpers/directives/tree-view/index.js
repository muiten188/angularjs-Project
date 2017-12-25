import TreeView from './tree-view';
import TreeNode from './tree-node';

export default angular.module('app.directives.treeView', [])
    .directive('treeView', () => new TreeView)
    .directive('treeNode', ['$compile', ($compile) => { return new TreeNode($compile); }])
    .name;