import FileNameFilter from './file-name.filter';
import ServerPathFilter from './server-path.filter';
export default angular.module('app.filters', [])
    .filter('filename', () => new FileNameFilter)
    .filter('mediaserver', () => new ServerPathFilter)
    .name;