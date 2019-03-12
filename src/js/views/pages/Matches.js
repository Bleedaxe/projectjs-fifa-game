import MatchesService from "../../services/MathcesService.js";

const Matches = {
    render : async () => {
        return await MatchesService.render();
    },
    after_render: async () => {
        await MatchesService.afterRender();
    }

}

export default Matches;