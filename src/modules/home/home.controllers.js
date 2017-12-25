class HomeController {
  constructor(contextValueService) {
    this.name = 'World';
    this.model = ['Node_2_2_1'];
    this.contextValueService = contextValueService;
  }

  changeName() { 
    this.name = 'angular-tips'; 
  }
}

HomeController.$inject = ['contextValueService'];

export default HomeController;