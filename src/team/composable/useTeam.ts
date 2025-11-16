import { computed, ref } from "vue";
import { useTeamStore } from "../store/teamStore";

export function useTeam() {
  const store = useTeamStore();

  const teams = computed(() => store.teams);
  const currentTeam = computed(() => store.currentTeam);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);
  
  const hasTeams = computed(() => store.hasTeams);
  const teamsCount = computed(() => store.teamsCount);

  return {
    teams,
    currentTeam,
    loading,
    error,
    
    hasTeams,
    teamsCount,
    getTeamById: store.getTeamById,

    fetchAllTeams: store.fetchAllTeams,
    fetchTeamById: store.fetchTeamById,
    clearError: store.clearError,
    clearCurrentTeam: store.clearCurrentTeam,
    reset: store.reset
  };
}