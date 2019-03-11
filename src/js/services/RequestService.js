const RequestService = (function () {
    const parseRequestUrl = function () {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/");
        let request = {
            resource    : null,
            id          : null
        };

        request.resource = r[0];
        request.id = r[1];

        return request
    }
    return {
        parseRequestUrl
    }
})();

export default RequestService;