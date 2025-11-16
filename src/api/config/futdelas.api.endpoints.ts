export const API_ENDPOINTS = {
    TOURNAMENTS: {
        DETAILS: '/tournaments/details',
        STANDINGS: '/tournaments/standings',
        LAST_MATCHES: '/tournaments/last-matches',
    },
    TEAMS: {
        ALL: '/teams',
        DETAILS: (teamId: number) =>  `/teams/${teamId}/details`,
    },
}