import AjaxService from "./AjaxService.js";
import CONSTANTS from "./../util/constants.js";

const TeamService = (function () {
    let teams;
    let getTeams = async () => {
        try {
            teams = await AjaxService.get(CONSTANTS.Routes.teams);
            return teams;
        } catch (err) {
            console.log('Error getting documents', err)
        }
     }

    const get = async function (filter = null) {
        teams = await getTeams();
        if (filter !== null) {
            teams = teams.filter(t => t.country.toLowerCase().includes(filter.toLowerCase()));
        }
        return teams;       
    }

    return {
        get
    }
})();

export default TeamService;