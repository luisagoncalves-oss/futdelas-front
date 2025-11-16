import { computed } from "vue";
import { useTeamStore } from "../store/teamStore";
import type { TeamResponse } from "../types";

interface UseTeamCardProps {
  team: TeamResponse;
}

export function useTeamCard(props: UseTeamCardProps) {
  const store = useTeamStore();

  const isFavorite = computed(() => store.isTeamFavorite(props.team.id));

  const handleFavoriteClick = () => {
    store.setFavoriteTeam(props.team.id);
  };

  return {
    isFavorite,
    handleFavoriteClick
  };
}