const RequestService = (function () {
    const parseRequestUrl = function () {
        let url = location.hash.slice(1).toLowerCase() || '/';
        debugger;
        let r = url.split("/");
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        };

        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request
    }
    return {
        parseRequestUrl
    }
})();

export default RequestService;