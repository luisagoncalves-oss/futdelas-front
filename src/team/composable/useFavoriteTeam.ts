import { computed, onMounted } from 'vue';
import { useTeamStore } from '../store/teamStore';

export function useFavoriteTeam() {
  const store = useTeamStore();

  onMounted(() => {
    store.loadFavoriteTeamFromStorage();
  });

  return {
    favoriteTeam: computed(() => store.favoriteTeam),
    hasFavoriteTeam: computed(() => store.hasFavoriteTeam),
    setFavoriteTeam: store.setFavoriteTeam,
    clearFavoriteTeam: store.clearFavoriteTeam
  };
}