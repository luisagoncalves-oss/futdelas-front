import { API_ENDPOINTS } from "@/api/config/futdelas.api.endpoints";
import { apiClient } from "@/api/config/futedelas.api.client";
import { StandingsResponse } from "../types";

export class StandingsController {
    static async getStandings(): Promise<StandingsResponse> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.TOURNAMENTS.STANDINGS)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch tournament standings');
        }
    }   
}