import { API_ENDPOINTS } from "./config/futdelas.api.endpoints";
import { apiClient } from "./config/futedelas.api.client";
import { TournamentDetails } from "./types/tournament-details.type";
import { EventsResponse } from "./types/tournament-last-matches.type";
import { StandingsResponse } from "./types/tournament-standings.type";

export class TournamentService {
    static async getTournamentDetails(): Promise<TournamentDetails> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.TOURNAMENTS.DETAILS)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch tournament details');
        }
    }

    static async getTournamentLogo(): Promise<any> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.TOURNAMENTS.LOGO)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch tournament logo');
        }
    }

    static async getStandings(): Promise<StandingsResponse> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.TOURNAMENTS.STANDINGS)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch tournament standings');
        }
    }

    static async getLastMatches(pageIndex: number = 0): Promise<EventsResponse> {
        try {
            const response = await apiClient.get(`${API_ENDPOINTS.TOURNAMENTS.LAST_MATCHES}?pageIndex=${pageIndex}`)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch tournament last matches');
        }
    }

}