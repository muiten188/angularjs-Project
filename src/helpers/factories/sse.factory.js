import angular from 'angular';

const SseFactory = () => {
    const sseFactory = {};

    sseFactory.connect = function (path, options) {
        if (!!window.EventSource) {
            const source = new EventSource(path);

            source.addEventListener('message', function (e) {
                if (options.onMessage) {
                    options.onMessage(e.data);
                }
            }, false);

            source.addEventListener('open', function (e) {
                if (options.onOpen) {
                    options.onOpen(e);
                }
            }, false);

            source.addEventListener('error', function (e) {
                if (e.readyState == EventSource.CLOSED) {
                    if (options.onClosed) {
                        options.onClosed(e);
                    }
                }
            }, false);
        }
    }

    return sseFactory;
}

export default SseFactory;