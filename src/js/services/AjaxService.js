const AjaxService = (function () {
    const get = function (url) {
        if (!url) {
            throw new Error("Url can't be empty!");
        }
        return fetch(url).then(r => r.json());
    };

    return {
        get
    }
})();

export default AjaxService;