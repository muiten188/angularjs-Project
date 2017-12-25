import APP_MENU from '../../config/app.menu';

class MenuController {

    constructor() {
        let self = this;
        self.listMenu = APP_MENU;
    }

}

MenuController.$inject = [];

export default MenuController;