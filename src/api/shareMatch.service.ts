import { API_ENDPOINTS } from "./config/futdelas.api.endpoints";
import { apiClient } from "./config/futedelas.api.client";

export class ShareMatch {
    static async share(matchId: any) {
        try {
            const response = await apiClient.get(API_ENDPOINTS.MATCH_IMAGE.MATCH(matchId));
            return response;
        } catch (error) {
            throw new Error('Failed to get image');
        }
    }
}