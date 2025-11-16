// composables/useStandings.ts
import { computed } from "vue";
import { useStandingsStore } from "../store/standingsStore";

export function useStandings() {
  const store = useStandingsStore();

  const standings = computed(() => store.standings);
  const loadingRows = computed(() => store.loading);
  const isError = computed(() => store.error);
  
  const hasStandings = computed(() => store.hasStandings);
  const hasError = computed(() => store.hasError);

  const standingsRows = computed(() => 
    store.standings?.standings?.[0]?.rows || []
  );

  const standingsTable = computed(() => 
    store.standings?.standings?.[0]
  );

  return {
    standings,
    loadingRows,
    isError,
    
    hasStandings,
    hasError,
    standingsRows,
    standingsTable,
    getStandingByTeamId: store.getStandingByTeamId,

    fetchStandings: store.fetchStandings,
    refreshStandings: store.refreshStandings,
    clearError: store.clearError,
    clearStandings: store.clearStandings,
    reset: store.reset
  };
}