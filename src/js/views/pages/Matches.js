import MatchesService from "../../services/MathcesService.js";

const Matches = {
    render : async (code) => {
        if(!code){
            return "No result found! :(";
        }
        return await MatchesService.get(code);
    },
    after_render: async () => {
        
    }

}

export default Matches;