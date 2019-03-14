import MatchesService from "../../services/MathcesService.js";
import HashService from "../../services/HashService.js";
import SearchService from "../../services/SearchService.js";
import CONSTANTS from "../../util/constants.js";

const Matches = {
    render : async () => {
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
            const goalDiff = MatchesService.getGoalDifference(m);
            const result = 
            `
                <tr class="clickable" id="${m.fifa_id}">
                    <td>${m.venue}</td>
                    <td>${m.location}</td>
                    <td>${homeTeam.country}</td>
                    <td>${homeTeam.goals} : ${awayTeam.goals}</td>
                    <td>${awayTeam.country}</td>
                    <td>${m.winner}</td>
                    <td>${goalDiff}</td>
                </tr>
            `;
            return result;
        }


        let code = HashService.getParts()[1];

        const goalDiff = SearchService.getParam(CONSTANTS.search.Matches.goalDifference.id) || 0;

        const matches = code 
            ? await MatchesService.getForTeam(code)        
            : await MatchesService.getMatches();

        if(goalDiff){
            matches = matches
                .filter(m => MatchesService.getGoalDifference(m) >= +goalDiff);
        }

        const result = 
        `   <h1 style="text-align:center;">Matches</h1>
            ${SearchService.getInputField(CONSTANTS.search.Matches.code.id, CONSTANTS.search.Matches.code.name, (!!code ? code.toUpperCase() : null))}
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
    },
    after_render: async () => {
        const changeHash = function () {
            const code = SearchService.getInputValue(CONSTANTS.search.Matches.code.id);
            location.hash = HashService.getParts()[0] + `/${code}`;
        }

        const addEventToRow = function (tr) {
            const onClick = function (){
                location.hash = 'match/' + tr.id;
            }
            tr.addEventListener('click', onClick);
        }

        SearchService.addEventHandler(CONSTANTS.search.Matches.code.id, changeHash);
        SearchService.addEventHandler(CONSTANTS.search.Matches.goalDifference.id);
        [...document.getElementsByTagName('tr')]
            .forEach(addEventToRow);
    }

}

export default Matches;