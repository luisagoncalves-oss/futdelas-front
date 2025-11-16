import { computed } from "vue";
import { useTournamentStore } from "../store/tournamentStore";

export function useTournament() {
  const store = useTournamentStore();

  const tournament = computed(() => store.tournament);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);
  
  const hasTournament = computed(() => store.hasTournament);
  const hasError = computed(() => store.hasError);

  const tournamentName = computed(() => store.tournamentName);
  const tournamentTitleHolder = computed(() => store.tournamentTitleHolder);
  const tournamentStartDate = computed(() => store.tournamentStartDate);
  const tournamentEndDate = computed(() => store.tournamentEndDate);
  
  const tournamentSeason = computed(() => store.tournamentSeason);
  const tournamentSeasonBR = computed(() => store.tournamentSeasonBR);
  const formattedStartDate = computed(() => store.formattedStartDate);
  const formattedEndDate = computed(() => store.formattedEndDate);
  const isTournamentActive = computed(() => store.isTournamentActive);

  return {
    tournament,
    loading,
    error,
    
    hasTournament,
    hasError,
    
    tournamentName,
    tournamentTitleHolder,
    tournamentStartDate,
    tournamentEndDate,
    
    tournamentSeason,
    tournamentSeasonBR,
    formattedStartDate,
    formattedEndDate,
    isTournamentActive,
    
    fetchTournament: store.fetchTournament,
    refreshTournament: store.refreshTournament,
    clearErrors: store.clearError,
    clearTournament: store.clearTournament,
    reset: store.reset
  };
}