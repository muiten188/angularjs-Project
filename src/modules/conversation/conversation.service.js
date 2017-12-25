import angular from 'angular';
import APP from "../../config/constants.js";

class ConversationService {
    constructor($http) {
        this.$http = $http;
    }

    getDetail(data) {
        return this.$http.get(APP.API_CONVERSATION +"loadConversationDetail", {
            params: data
        })
    };

    search(data) {
        return this.$http.get(APP.API_CONVERSATION, {
            params: data
        });
    };

    update(data) {
        return this.$http.put(APP.API_CONVERSATION, data);
    };

    reply(data) {
        return this.$http.post(APP.API_CONVERSATION + "reply", data);
    };

}

ConversationService.$inject = ['$http'];

export default angular.module('app.services.conversation', [])
    .service('conversationService', ConversationService)
    .name;