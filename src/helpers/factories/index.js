import SseFactory from './sse.factory';

export default angular.module('app.factories', [])
    .factory('SseFactory', SseFactory)
    .name;