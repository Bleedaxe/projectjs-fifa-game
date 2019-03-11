import AjaxService from "./AjaxService.js";
import CONSTANTS from "./../util/constants.js";

const TeamService = (function () {
    let teams;
    let getTeams = async () => {
        try {
            const teams = await AjaxService.get(CONSTANTS.Routes.teams);
            return teams
        } catch (err) {
            console.log('Error getting documents', err)
        }
     }

    const showTeams = async function () {
        const teamToHtml = function (t) {
            const result = 
            `
            <tr id=${t["fifa_code"]}>
                <td>${t['country']}</td>
                <td>${t['group_letter']}</td>
            </tr>
            `;
            return result;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const country = urlParams.get('country');
        teams = await getTeams();
        if (country !== null) {
            teams = teams.filter(t => t["country"].includes(country));
        }
        const result = 
        `
        <input id="country" type="text" value="${country || ""}"/>
        <input id="coutrySearch" type="submit" value="Search"/>        
        <table class="table">
            <thead class="thead-dark">
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

    const afterRender = async function () {
        const addShowMatchButton = function (team) {
            const onClick = function () {
                location.hash = 'matches/' + team["fifa_code"];
            }

            const tr = document.getElementById(team["fifa_code"]);
            if (tr === null) {
                return;
            }
            const td = document.createElement('td');
            const btn = document.createElement('button');
            btn.textContent = "Show Matches";
            btn.addEventListener('click', onClick);
            
            td.appendChild(btn);
            tr.appendChild(td);
        }
        const onSearch = function () {
            const input = document.getElementById('country');
            const search = new URLSearchParams();
            search.append('country', input.value);
            location.search = search.toString();
        }
        const search = document.getElementById('coutrySearch');
        search.addEventListener('click', onSearch);
        teams.forEach(addShowMatchButton);
    }

    return {
        showTeams,
        afterRender
    }
})();

export default TeamService;