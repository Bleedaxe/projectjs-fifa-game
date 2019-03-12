const HistoryService = (function () {
    const getHistory = function () {
        return Object.keys(localStorage)
            .sort((a, b) => b - a)
            .map(k => localStorage[k]);
    }

    return {
        getHistory
    }
})();

export default HistoryService;