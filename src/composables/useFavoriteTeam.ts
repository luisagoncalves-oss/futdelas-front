import { ref } from 'vue';
import { FavoriteTeam } from '@/api/types/favoriteTeam.type';
import { FavoriteTeamService } from '@/api/favoriteTeam.service';

export const useFavoriteTeam = () => {
    const favoriteTeam = ref<FavoriteTeam | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchFavoriteTeam = async (userId: string) => {
        loading.value = true;
        error.value = null;
        
        try {
            const response = await FavoriteTeamService.getFavoriteTeam(userId);
            favoriteTeam.value = response;
            return response;
        } catch (err) {
            error.value = 'Erro ao buscar time favorito';
            console.error('Erro ao buscar time favorito:', err);
            favoriteTeam.value = null;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const setFavoriteTeam = (team: FavoriteTeam | null) => {
        favoriteTeam.value = team;
    };

    const clearFavoriteTeam = () => {
        favoriteTeam.value = null;
        error.value = null;
    };

    return {
        favoriteTeam,
        loading,
        error,
        fetchFavoriteTeam,
        setFavoriteTeam,
        clearFavoriteTeam
    };
};