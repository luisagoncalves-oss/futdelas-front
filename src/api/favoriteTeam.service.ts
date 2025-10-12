import { API_ENDPOINTS } from "./config/futdelas.api.endpoints";
import { apiClient } from "./config/futedelas.api.client";
import { FavoriteTeam } from "./types/favoriteTeam.type";

export class FavoriteTeamService {
    static async saveTeam(favoriteTeam: FavoriteTeam) {
        try {
            const response = await apiClient.post(API_ENDPOINTS.FAVORITE_TEAM.DEFAULT, favoriteTeam);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save favorite team');
        }
    }

    static async deleteTeam(userId: string) {
        try {
            const response = await apiClient.delete(API_ENDPOINTS.FAVORITE_TEAM.BY_USER(userId));
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete favorite team');
        }
    }

    static async verifyTeam(userId: string) {
        try {
            const response = await apiClient.get(API_ENDPOINTS.FAVORITE_TEAM.VERIFY(userId));
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete favorite team');
        }
    }

    static async getFavoriteTeam(userId: string): Promise<FavoriteTeam> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.FAVORITE_TEAM.GET(userId));
            return response.data;
        } catch (error) {
            throw new Error('Failed to find favorite team');
        }
    }
}