import angular from "angular";
import "@uirouter/angularjs";
import carousel from "angular-ui-bootstrap/src/carousel";

import localeToastrService from "../../helpers/services/locale-toastr.service";
import confirmDialog from "../../helpers/services/confirm/confirm.service";

import routing from "./datainput.routes";
import {
  DatainputController,
  DataInputCreateController,
  DataInputUpdateController
} from "./datainput.controllers";
import dataInputService from "./datainput.service";

import buildingService from "../building/building.service";
import apartmentService from "../apartment/apartment.service";
import floorService from "../floor/floor.service";
import serviceService from "../service/service.service";
export default angular
  .module("app.datainput", [
    "ui.router",
    confirmDialog,
    localeToastrService,
    dataInputService,
    buildingService,
    apartmentService,
    floorService,
    serviceService
  ])
  .config(routing)
  .controller("datainputController", DatainputController)
  .controller("dataInputCreateController", DataInputCreateController)
  .controller("dataInputUpdateController",DataInputUpdateController)
  .name;
