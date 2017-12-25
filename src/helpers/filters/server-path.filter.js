import APP from "../../config/constants.js";

class ServerPathFilter {
    constructor() {
        return (input) => {
            if (input) {
                return APP.MEDIA_SERVER + (input[0] === '/' ? '' : '/') + input;
            }
            return input;
        };
    }

    static filter() {
        return new ServerPathFilter();
    }
}

export default ServerPathFilter;