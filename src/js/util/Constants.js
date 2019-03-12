const CONSTANTS = {
    container: document.getElementById('page_container'),
    Routes: {
        teams: "http://worldcup.sfg.io/teams/",
        matches: "http://worldcup.sfg.io/matches",
        groups: "http://worldcup.sfg.io/teams/group_results",
    },
    events: {
        searchChange: 'onSearch',
        historyAdd: 'history'
    },
    search: {
        coutnry: {
            id: 'country',
            name: 'Country'
        },
        Matches: {
            code: {
                id: 'id',
                name: 'Code'
            },
            goalDifference: {
                id: 'goalDiff',
                name: 'Goal Difference'
            }
        }
    },
    localStorage: {
        history: 'history'
    }
};

export default CONSTANTS;