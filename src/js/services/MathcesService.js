import AjaxService from "./AjaxService.js";
import CONSTANTS from "../util/Constants.js";
import SearchService from "./SearchService.js";
import HashService from "./HashService.js";

const MatchesService = (function () {
    const getGoalDifference = function (m) {
        return Math.abs(m.home_team.goals + m.home_team.penalties -  m.away_team.goals +  m.away_team.penalties);
    }

    const matchToHtml = function (m) {
        const getWinner = function (first, second) {
            if(first.goals > second.goals){
                return first;
            }

            if (second.goals > first.goals) {
                return second;
            }

            if (first.penalties > second.penalties){
                return first;
            }

            return second;
        }

        const homeTeam = m.home_team;
        const awayTeam = m.away_team;
        const winner = getWinner(homeTeam, awayTeam);
        winner.goalDiff = getGoalDifference(m);
        const result = 
        `
            <tr>
                <td>${m.venue}</td>
                <td>${m.location}</td>
                <td>${homeTeam.country}</td>
                <td>${homeTeam.goals} : ${awayTeam.goals}</td>
                <td>${awayTeam.country}</td>
                <td>${winner.country}</td>
                <td>${winner.goalDiff}</td>
            </tr>
        `;
        return result;
    }

    const render = async function () {
        let matches = await AjaxService.get(CONSTANTS.Routes.matches);

        let code = HashService.getParts()[1];

        const goalDiff = SearchService.getParam(CONSTANTS.search.Matches.goalDifference.id) || 0;

        if(code){
            code = code.toUpperCase();
            matches = matches
                .filter(m => m.home_team.code.toUpperCase() == code || m.away_team.code.toUpperCase() == code);
        }

        if(goalDiff){
            matches = matches
                .filter(m => getGoalDifference(m) >= +goalDiff);
        }

        const result = 
        `   <h1 style="text-align:center;">Matches</h1>
            ${SearchService.getInputField(CONSTANTS.search.Matches.code.id, CONSTANTS.search.Matches.code.name, code)}
            ${SearchService.getInputField(CONSTANTS.search.Matches.goalDifference.id, CONSTANTS.search.Matches.goalDifference.name, goalDiff, 'number')}
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th>Venue</th>
                        <th>Location</th>
                        <th>Home Team</th>
                        <th>:</th>
                        <th>Away Team</th>
                        <th>Winner</th>
                        <th>Goal Difference</th>
                    </tr>
                </thead>
                <tbody>
                    ${matches.length !== 0 
                        ? matches
                            .map(matchToHtml)
                            .join('\n')
                        : `<tr>
                            <td>No matches found...</td>
                        </tr>`
                    }
                </tbody>
            </table>
        `;
        return result;
    }

    const afterRender = async function () {
        const changeHash = function () {
            const code = SearchService.getInputValue(CONSTANTS.search.Matches.code.id);
            location.hash = HashService.getParts()[0] + `/${code}`;
        }

        SearchService.addEventHandler(CONSTANTS.search.Matches.code.id, changeHash);
        SearchService.addEventHandler(CONSTANTS.search.Matches.goalDifference.id);
    } 

    return {
        render,
        afterRender
    }
})();

export default MatchesService;