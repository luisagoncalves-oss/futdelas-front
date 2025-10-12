export const API_ENDPOINTS = {
    TOURNAMENTS: {
        DETAILS: '/tournaments/details',
        LOGO: '/tournaments/logo',
        STANDINGS: '/tournaments/standings',
        LAST_MATCHES: '/tournaments/last-matches',
    },
    TEAMS: {
        ALL: '/teams',
        DETAILS: (teamId: string | number) =>  `/teams/${teamId}/details`,
        LOGO: (teamId: string | number) =>  `/teams/${teamId}/logo`,
        NEXT_MATCHES: (teamId: string | number) =>  `/teams/${teamId}/next-matches`,
    },
    MATCH_IMAGE: {
        MATCH: (matchId: string | number) =>  `/match/${matchId}/image`,
    },
    FAVORITE_TEAM: {
        DEFAULT: '/favorite-team',
        BY_USER: (userId: string | number) =>  `/favorite-team/user/${userId}`,
        VERIFY: (userId: string | number) =>  `/favorite-team/exists/${userId}`,
        GET: (userId: string | number) =>  `/favorite-team/${userId}`
    }
}