import HistoryService from "../../services/HistoryService.js";

const History = (function () {
   const render = async function () {
        const toHtml = function (element) {
            return `<a href="${element}" class="list-group-item list-group-item-action">${element.key} | ${element.value}</a>`
        }
        const historyElements = await HistoryService.getHistory();
        const result = 
        `
            <h1>History</h1>
            <div class="list-group">
                ${historyElements
                    .map(toHtml)
                    .join('\n')}
            </div>
        `;
        return result;
    };

    const after_render = async function () {
        
    }

    return {
        render,
        after_render
    }
})();

export default History;