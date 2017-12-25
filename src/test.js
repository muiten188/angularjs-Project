import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.js';

import angular from 'angular';
import '@uirouter/angularjs';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import uiSelect from 'ui-select';
import 'ui-select/dist/select.css';

angular.module('app', [
  ngAnimate,
  uiSelect,
  ngSanitize,
]).controller('TestController', ['$scope', '$http', function ($scope, $http) {
  const self = this;
  self.refreshApartments = function (search) {
    if (angular.isUndefined(search) || search == null || search.length < 3) return;

    $http.get("http://localhost:8090/apartment/search", {
      params: { search: search }
    }).then(response => {
      self.availableApartments = response.data;
    });
  }

}]);