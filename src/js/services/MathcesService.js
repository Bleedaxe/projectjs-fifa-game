import AjaxService from "./AjaxService.js";
import CONSTANTS from "../util/Constants.js";

const MatchesService = (function () {
    const get = async function (code) {
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
            winner.goalDiff = Math.abs(homeTeam.goals + homeTeam.penalties - awayTeam.goals + awayTeam.penalties);
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

        let matches = await AjaxService.get(CONSTANTS.Routes.matches);
        matches = matches
            .filter(m => m.home_team.code.toLowerCase() == code || m.away_team.code.toLowerCase() == code);
        const result = 
        `
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
                    ${matches
                        .map(matchToHtml)
                        .join('\n')}
                </tbody>
            </table>
        `;
        return result;
    }

    return {
        get
    }
})();

export default MatchesService;