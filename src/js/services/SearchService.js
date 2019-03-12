import PubSub from "../../observer/PubSub.js";
import CONSTANTS from "../util/constants.js";

const SearchService = (function () {
    const changeUrl = function (hash, queryString = "") {
        queryString = !queryString
        ? ""
        : `?${queryString}`;

        window.history.replaceState(null, "", "/" + queryString + hash);

        PubSub.publish(CONSTANTS.events.searchChange);
    }

    const getInputField = function (id, searchName, value, inputType = "text") {
        value = value || "";
        const result = 
        `
        <div class="input-group mb-3 mt-3">
            <input id="${id}" type="${inputType}" class="form-control" placeholder="Search by ${searchName}" aria-label="Search by ${searchName}" aria-describedby="button-addon2" value="${value}">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="${id}Search">Search</button>
            </div>
        </div>
        `
        return result;
    }

    const getInputValue = function (id) {
        return document.getElementById(id).value;
    }

    const addEventHandler = function (id, callback) {
        const onSearch = function () {
            const input = getInputValue(id);
            
            const search = new URLSearchParams(location.search);
            search.delete(id);
            search.append(id, input);
            
            let searchString = search.toString();
            changeUrl(location.hash, searchString);
        }

        callback = callback || onSearch;

        const search = document.getElementById(id + 'Search');
        search.addEventListener('click', callback);
    }

    const getParam = function (name) {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(name);
    }

    return {
        getInputField,
        addEventHandler,
        getParam,
        changeUrl,
        getInputValue
    }
})();

export default SearchService;