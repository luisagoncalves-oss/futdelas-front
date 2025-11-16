// composables/useMatch.ts
import { computed } from "vue";
import { useMatchStore } from "../store/matchStore";

export function useMatch() {
  const store = useMatchStore();

  const lastMatches = computed(() => store.lastMatches);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);
  const currentPage = computed(() => store.currentPage);
  
  const hasLastMatches = computed(() => store.hasLastMatches);
  const matchesCount = computed(() => store.matchesCount);
  const hasError = computed(() => store.hasError);

  return {
    lastMatches,
    loading,
    error,
    currentPage,
    
    hasLastMatches,
    matchesCount,
    hasError,
    getMatchById: store.getMatchById,

    fetchLastMatches: store.fetchLastMatches,
    refreshLastMatches: store.refreshLastMatches,
    loadMoreMatches: store.loadMoreMatches,
    clearError: store.clearError,
    clearMatches: store.clearMatches,
    reset: store.reset
  };
}