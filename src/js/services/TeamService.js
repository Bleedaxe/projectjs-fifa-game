import AjaxService from "./AjaxService.js";
import CONSTANTS from "./../util/constants.js";

const TeamService = (function () {
    let getTeams = async () => {
        try {
            const teams = await AjaxService.get(CONSTANTS.Routes.teams);
            return teams
        } catch (err) {
            console.log('Error getting documents', err)
        }
     }

    const showTeams = async function () {
        const teams = await getTeams();
        const teamToHtml = function (t) {
            const onClick = function () {
                const pageHash = 'matches/' + t["fifa_code"];
                location.hash = pageHash;
            }
            const result = 
            `
            <tr>
                <td>${t['country']}</td>
                <td>${t['group_letter']}</td>
                <td><button onclick="${onClick}">Show matches</button></td>
            </tr>
            `;
            return result;
        }
        const result = 
        `
        <table>
            <thead>
                <tr>
                    <th>Coutry</th>
                    <th>Group</th>
                    <th>Matches</th>
                </tr>
            </thead>
            <tbody>
                ${teams
                    .map(teamToHtml)
                    .join('\n')}
            </tbody>
        </table>
        `;

        return result;
    }

    return {
        showTeams
    }
})();

export default TeamService;