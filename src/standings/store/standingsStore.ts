import { defineStore } from 'pinia';
import { StandingsResponse } from '../types';
import { StandingsController } from '../controller';

interface StandingsState {
  standings: StandingsResponse | null;
  loading: boolean;
  error: string | null;
}

export const useStandingsStore = defineStore('standings', {
  state: (): StandingsState => ({
    standings: null,
    loading: false,
    error: null
  }),

  getters: {
    hasStandings: (state) => state.standings !== null,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    
    getStandingByTeamId: (state) => (teamId: number) => 
      state.standings?.standings.find(standing => standing.rows[0].team.id === teamId)
  },

  actions: {
    async fetchStandings(): Promise<void> {
      if (this.hasStandings) return;

      this.setLoading(true);
      this.setError(null);
      
      try {
        const standings = await StandingsController.getStandings();
        this.setStandings(standings);
      } catch (error) {
        this.setError(this.getErrorMessage(error));
      } finally {
        this.setLoading(false);
      }
    },

    async refreshStandings(): Promise<void> {
      this.setStandings(null);
      await this.fetchStandings();
    },

    setStandings(standings: StandingsResponse | null): void {
      this.standings = standings;
    },

    setLoading(loading: boolean): void {
      this.loading = loading;
    },

    setError(error: string | null): void {
      this.error = error;
    },

    getErrorMessage(error: unknown): string {
      return error instanceof Error ? error.message : 'Erro ao carregar classificação';
    },

    clearError(): void {
      this.setError(null);
    },

    clearStandings(): void {
      this.setStandings(null);
    },

    reset(): void {
      this.$reset();
    }
  }
});