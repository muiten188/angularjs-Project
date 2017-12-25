  class TestController {
      constructor($uibModal, userService) {
          let self = this;
          self.$uibModal = $uibModal;
      }

      onSearch(paging) {
          var self = this;
        //   self.testService.search(self.test).then((response) => {
        //       self.datasource = response.data;
        //   }, () => {});
      }

  }

  TestController.$inject = ['$uibModal', 'userService'];

  export default {
      TestController
  }