import { API_ENDPOINTS } from "@/api/config/futdelas.api.endpoints";
import { apiClient } from "@/api/config/futedelas.api.client";
import { EventResponse } from "../types";

export class MatchController {
    static async getLastMatches(pageIndex: number = 0): Promise<EventResponse> {
        try {
            const response = await apiClient.get(
                `${API_ENDPOINTS.TOURNAMENTS.LAST_MATCHES}?pageIndex=${pageIndex}`
            );
            
            if (!response.data) {
                throw new Error('Dados não encontrados');
            }
            
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar partidas:', error);
            throw new Error(
                error instanceof Error 
                    ? error.message 
                    : 'Falha ao carregar as últimas partidas'
            );
        }
    }
}