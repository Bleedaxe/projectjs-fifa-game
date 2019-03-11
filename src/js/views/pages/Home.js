import TeamService from "../../services/TeamService.js";

const Home = {
    render : async () => {
        const teams = await TeamService.showTeams();
        return teams;
    },
    after_render: async () => {
    }

}

export default Home;