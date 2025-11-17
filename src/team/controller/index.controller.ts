import { API_ENDPOINTS } from "@/api/config/futdelas.api.endpoints";
import { apiClient } from "@/api/config/futedelas.api.client";
import { TeamResponse } from "../types";


export class TeamController {
    static async getTeamDetails(teamId: number): Promise<TeamResponse> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.TEAMS.DETAILS(teamId))
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar time');
        }
    }

    static async getAllTeams(): Promise<TeamResponse[]> {
       try {
            const response = await apiClient.get(API_ENDPOINTS.TEAMS.ALL)
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar times');
        } 
    }
}