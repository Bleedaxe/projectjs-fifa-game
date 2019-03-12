const HashService = (function () {
    const getParts = function () {
        const hashParts = location.hash.slice(1).split('/');
        return hashParts;
    }
    return {
        getParts
    }
})();

export default HashService;