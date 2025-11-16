import { API_ENDPOINTS } from "@/api/config/futdelas.api.endpoints";
import { apiClient } from "@/api/config/futedelas.api.client";
import { TournamentResponse } from "../types";

export class tournamentController {
        static async getTournamentDetails(): Promise<TournamentResponse> {
            try {
                const response = await apiClient.get(API_ENDPOINTS.TOURNAMENTS.DETAILS)
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch tournament details');
            }
        }
    
}