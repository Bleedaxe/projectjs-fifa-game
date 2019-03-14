import HashService from "../../services/HashService.js";
import MatchesService from "../../services/MathcesService.js";

const Match = (function (){
    const render = async function () {
        const teamToHtml = function (team) {
            const result =
            `
                <div class="card card-body">
                    Country: ${team.country}
                </div>
                <div class="card card-body">
                    Code: ${team.code}
                </div>
                <div class="card card-body">
                    Goals: ${team.goals}
                </div>
                <div class="card card-body">
                    Penalties: ${team.penalties}
                </div>
            `;
            return result;
        }
        const fifa_id = HashService.getParts()[1];

        const match = await MatchesService.getMatch(fifa_id);
        
        const result = 
        `
            <h1>Match</h1>
            <h2>${match.home_team_country} - ${match.away_team_country}</h2>
            <h3>${match.location} (${match.venue})</h3>
            <br/>
            
            <h4>Details</h4>
            <div class="col-md-12">
                
                <div class="col-md-4 collapseDetails">
                    <p>
                        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseHome" aria-expanded="false" aria-controls="collapseHome">
                            Home Team
                        </button>
                    </p>
                    <div class="collapse" id="collapseHome">
                        ${teamToHtml(match.home_team)}
                    </div>
                </div>
                <div class="col-md-4 collapseDetails">
                    <p>
                        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseWeather" aria-expanded="false" aria-controls="collapseWeather">
                            Weather
                        </button>
                    </p>
                    <div class="collapse" id="collapseWeather">
                        <div class="card card-body">
                            Humidity: ${match.weather.humidity}
                        </div>
                        <div class="card card-body">
                            Temperature: ${match.weather.temp_celsius} °C / ${match.weather.temp_farenheit} °F
                        </div>
                        <div class="card card-body">
                            Wind Speed: ${match.weather.wind_speed}
                        </div>
                        <div class="card card-body">
                            Description: ${match.weather.description}
                        </div>
                    </div>
                </div>
                <div class="col-md-4 collapseDetails">
                    <p>
                        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseAway" aria-expanded="false" aria-controls="collapseAway">
                            Away Team
                        </button>
                    </p>
                    <div class="collapse" id="collapseAway">
                        ${teamToHtml(match.away_team)}
                    </div>
                </div>
            </div>
            
        `;
        return result;
    };

    const after_render = async function () {
        
    }
    return {
        render,
        after_render
    };
})();

export default Match;