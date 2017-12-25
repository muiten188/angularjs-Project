routes.$inject = ["$stateProvider"];

export default function routes($stateProvider) {
  $stateProvider
    .state("datainput", {
      url: "/datainput",
      template: require("./view/index.html"),
      controller: "datainputController",
      controllerAs: "ctrl"
    })
}
