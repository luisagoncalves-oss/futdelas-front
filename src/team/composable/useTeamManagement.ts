// composables/useTeamManagement.ts (atualizado)
import { useTeam } from './useTeam';
import { useFavoriteTeam } from './useFavoriteTeam';

export function useTeamManagement() {
  const team = useTeam();
  const favorites = useFavoriteTeam();

  return {
    teams: team.teams,
    teamsCount: team.teamsCount,
    currentTeam: team.currentTeam,
    loading: team.loading,
    error: team.error,
    clearError: team.clearError,
    fetchAllTeams: team.fetchAllTeams,
    fetchTeamById: team.fetchTeamById,
    
    favoriteTeam: favorites.favoriteTeam,
    hasFavoriteTeam: favorites.hasFavoriteTeam,
    isTeamFavorite: favorites.isTeamFavorite,
    setFavoriteTeam: favorites.setFavoriteTeam,
    clearFavoriteTeam: favorites.clearFavoriteTeam
  };
}