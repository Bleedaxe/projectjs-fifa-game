import AjaxService from "./AjaxService.js";
import CONSTANTS from "../util/constants.js";

const GroupService = (function () {
    const getTeams = async function (group) {
        group = group.toUpperCase();
        const groups = await AjaxService.get(CONSTANTS.Routes.groups);
        return groups
            .filter(g => g.letter == group)
            .map(g => g.ordered_teams)[0];
    }
    return {
        getTeams
    }
})();

export default GroupService;