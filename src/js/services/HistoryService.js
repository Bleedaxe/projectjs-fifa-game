const HistoryService = (function () {
    const getHistory = function () {
        return Object.keys(localStorage)
            .sort((a, b) => b.localeCompare(a))
            .map(k => {
                return {
                    key: k,
                    value: localStorage[k]
                }
            });
    }

    return {
        getHistory
    }
})();

export default HistoryService;