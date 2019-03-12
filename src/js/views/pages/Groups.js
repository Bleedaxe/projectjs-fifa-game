import HashService from "../../services/HashService.js";
import GroupService from "../../services/GroupService.js";

const Group = (function () {
    let teams;
    const render = async function() {
        const teamToHtml = function (team) {
            const result = 
            `
                <tr id="${team.fifa_code}">
                    <td>${team.country}</td>
                    <td>${team.fifa_code}</td>
                    <td>${team.wins}</td>
                    <td>${team.draws}</td>
                    <td>${team.losses}</td>
                    <td>${team.points}</td>
                </tr>
            `;
            return result;
        }
        const group = HashService.getParts()[1];
        if(!group) {
            return "Group not found! :(";
        }
        const teams = await GroupService.getTeams(group);
        if (teams.length === 0) {
            return "Group not found! :(";
        }
        const result = 
        `
            <h1 style="text-align: center">Group ${group.toUpperCase()}</h1>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <td>Country</td>
                        <td>Fifa Code</td>
                        <td>Wins</td>
                        <td>Draws</td>
                        <td>Losses</td>
                        <td>Points</td>
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
    };

    const after_render = async function () {

    }

    return {
        render,
        after_render
    }
})();

export default Group;