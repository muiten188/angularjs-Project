const APP = {};
APP.MEDIA_SERVER = "http://localhost:8090";
APP.API_PATH = "http://localhost:8090";

// APP.IMAGE_PATH = "http://103.1.209.144:8080/hapulico-api";
// APP.API_PATH = "http://loca103.1.209.144:8080/hapulico-api";

// APP.IMAGE_PATH = "http://192.168.1.142:8090";
// APP.API_PATH = "http://192.168.1.142:8090";

// APP.IMAGE_PATH = "http://172.28.42.111:8090";
// APP.API_PATH = "http://172.28.42.111:8090";

// APP.IMAGE_PATH = "http://172.28.42.97:8090";
// APP.API_PATH = "http://172.28.42.97:8090";

// APP.IMAGE_PATH = "http://113.171.23.144/hapulico-api";
// APP.API_PATH = "http://113.171.23.144/hapulico-api";
APP.API_USER_LOGIN = APP.API_PATH + "/authentication/login";

APP.API_USER = APP.API_PATH + "/user/";
APP.API_FARM = APP.API_PATH + "/farm/";
APP.API_DEVICE = APP.API_PATH + "/device/";
APP.API_DEVICE_AVAILABLE_FOR_FARM = APP.API_DEVICE + "getAvailableForFarm";

APP.API_CAMERA = APP.API_PATH + "/camera/";
APP.API_CAMERA_AVAILABLE_FOR_FARM = APP.API_CAMERA + "getAvailableForFarm";

APP.API_ACTIVITY = APP.API_PATH + "/activity/";

APP.API_BUILDING = APP.API_PATH + "/building/";
APP.API_APARTMENT = APP.API_PATH + "/apartment/";
APP.API_FLOOR = APP.API_PATH + "/floor/";
APP.API_GROUP = APP.API_PATH + "/group/";
APP.API_STAFF = APP.API_PATH + "/staff/";
APP.API_RESIDENT = APP.API_PATH + "/resident/";
APP.API_ROLE_GROUP = APP.API_PATH + "/role-group/";
APP.API_UPLOAD = APP.API_PATH + "/upload/";
APP.API_REQUEST_CHANGE = APP.API_PATH + "/resident/request/";
APP.API_TEMPLATE = APP.API_PATH + "/template/";
APP.API_CONVERSATION = APP.API_PATH + "/conversation/";
APP.API_SERVICE = APP.API_PATH + "/service/";
APP.API_SERVICE_REGISTRATION = APP.API_PATH + "/apartment-service/";
APP.API_TARIFF = APP.API_PATH + "/tariff/";
APP.API_DATA_INPUT= APP.API_PATH  + "/data-input/";
APP.API_APARTMENT_MESSAGE= APP.API_PATH  + "/message/";
APP.API_INFO=APP.API_PATH  + "/regulation/";
APP.API_DATA_IMPORT=APP.API_PATH  + "/import/";
APP.API_INVOICE=APP.API_PATH  + "/invoice/";
APP.API_PAYMENT=APP.API_PATH  + "/payment/";

export default APP;