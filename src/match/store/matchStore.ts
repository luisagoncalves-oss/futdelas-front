import { defineStore } from 'pinia';
import { EventResponse } from '../types';
import { MatchController } from '../controller';

interface MatchState {
  lastMatches: EventResponse | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

export const useMatchStore = defineStore('match', {
  state: (): MatchState => ({
    lastMatches: null,
    loading: false,
    error: null,
    currentPage: 0
  }),

  getters: {
    hasLastMatches: (state) => state.lastMatches !== null,
    matchesCount: (state) => state.lastMatches?.events?.length || 0,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    
    getMatchById: (state) => (matchId: number) => 
      state.lastMatches?.events?.find(match => match.id === matchId)
  },

  actions: {
    async fetchLastMatches(pageIndex: number = 0): Promise<void> {
      if (this.lastMatches && this.currentPage === pageIndex) return;

      this.setLoading(true);
      this.setError(null);
      
      try {
        const matches = await MatchController.getLastMatches(pageIndex);
        this.setLastMatches(matches);
        this.setCurrentPage(pageIndex);
      } catch (error) {
        this.setError(this.getErrorMessage(error));
      } finally {
        this.setLoading(false);
      }
    },

    async refreshLastMatches(): Promise<void> {
      this.setCurrentPage(0);
      await this.fetchLastMatches(0);
    },

    async loadMoreMatches(): Promise<void> {
      const nextPage = this.currentPage + 1;
      await this.fetchLastMatches(nextPage);
    },

    setLastMatches(matches: EventResponse | null): void {
      this.lastMatches = matches;
    },

    setCurrentPage(page: number): void {
      this.currentPage = page;
    },

    setLoading(loading: boolean): void {
      this.loading = loading;
    },

    setError(error: string | null): void {
      this.error = error;
    },

    getErrorMessage(error: unknown): string {
      return error instanceof Error ? error.message : 'Erro ao carregar partidas';
    },

    clearError(): void {
      this.setError(null);
    },

    clearMatches(): void {
      this.setLastMatches(null);
      this.setCurrentPage(0);
    },

    reset(): void {
      this.$reset();
    }
  }
});