class FileNameFilter {
    constructor() {
        return (input) => {
            if (input) {
                let strInput = '' + input;
                let slashIndex = strInput.lastIndexOf('/');
                if (slashIndex >= 0) {
                    return strInput.substr(slashIndex + 1);
                }
                return strInput;
            }
            return input;
        };
    }

    static filter() {
        return new FileNameFilter();
    }
}

export default FileNameFilter;