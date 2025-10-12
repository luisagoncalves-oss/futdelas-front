import { API_ENDPOINTS } from "./config/futdelas.api.endpoints";
import { apiClient } from "./config/futedelas.api.client";
import { Team, TeamDetails } from "./types/team.type";

export class TeamService {
    static getNextMatches(teamId: string) {
      throw new Error('Method not implemented.');
    }
    static async getTeamDetails(teamId: string | number): Promise<TeamDetails> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.TEAMS.DETAILS(teamId))
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch team details');
        }
    }

    static async getTeamLogo(teamId: string | number): Promise<any> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.TEAMS.LOGO(teamId))
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch team logo');
        }
    }

    static async getAllTeams(): Promise<Team[]> {
       try {
            const response = await apiClient.get(API_ENDPOINTS.TEAMS.ALL)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch teams list');
        } 
    }
}