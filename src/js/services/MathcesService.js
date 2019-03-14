import AjaxService from "./AjaxService.js";
import CONSTANTS from "../util/Constants.js";

const MatchesService = (function () {
    const getGoalDifference = function (m) {
        return Math.abs(m.home_team.goals + m.home_team.penalties -  m.away_team.goals +  m.away_team.penalties);
    }   

    const getMatches = async function () {
        let matches = await AjaxService.get(CONSTANTS.Routes.matches);

        return matches;
    }

    const getForTeam = async function (code) {
        let matches = await AjaxService.get(CONSTANTS.Routes.countryMatches + code);

        return matches;
    }

    const getMatch = async function (fifa_id) {
        const matches = await getMatches();
        const match = matches.filter(m => m.fifa_id === fifa_id)[0];

        return match;
    }

    return {
        getMatches,
        getGoalDifference,
        getForTeam,
        getMatch
    };
})();

export default MatchesService;