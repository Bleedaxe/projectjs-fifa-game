import TeamService from "../../services/TeamService.js";
import SearchService from "../../services/SearchService.js";
import CONSTANTS from "../../util/constants.js";

const Home = (function () {
    let teams;
    const render = async function () {
        const teamToHtml = function (t) {
            const result = 
            `
            <tr id=${t["fifa_code"]}>
                <td>${t.country}</td>
                <td><a href="#group/${t.group_letter}">${t.group_letter}</a></td>
            </tr>
            `;
            return result;
        }
               
        const urlParams = new URLSearchParams(window.location.search);
        const country = urlParams.get(CONSTANTS.search.coutnry.id);

        teams = await TeamService.get(country);
        const result = 
        `
        <h2 style="text-align: center;">Teams</h2>
        ${SearchService.getInputField(CONSTANTS.search.coutnry.id, CONSTANTS.search.coutnry.name, country)}      
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
    };

    const after_render = async function () {
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
        SearchService.addEventHandler('country');
        teams.forEach(addShowMatchButton);
    }

    return {
        render,
        after_render
    }
})();

export default Home;