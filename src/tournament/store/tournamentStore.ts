import { defineStore } from 'pinia';
import { TournamentResponse } from '../types';
import { tournamentController } from '../controller';

interface TournamentState {
  tournament: TournamentResponse | null;
  loading: boolean;
  error: string | null;
}

export const useTournamentStore = defineStore('tournament', {
  state: (): TournamentState => ({
    tournament: null,
    loading: false,
    error: null
  }),

  getters: {
    hasTournament: (state) => state.tournament !== null,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    
    tournamentName: (state) => state.tournament?.uniqueTournament.name || '',
    
    tournamentTitleHolder: (state) => 
      state.tournament?.uniqueTournament.titleHolder || '',
    
    tournamentStartDate: (state) => 
      state.tournament?.uniqueTournament.startDateTimestamp || null,
    
    tournamentEndDate: (state) => 
      state.tournament?.uniqueTournament.endDateTimestamp || null,
    
    tournamentSeason: (state): string => {
      const startTimestamp = state.tournament?.uniqueTournament.startDateTimestamp;
      const endTimestamp = state.tournament?.uniqueTournament.endDateTimestamp;
      
      if (!startTimestamp || !endTimestamp) return '';
      
      const startDate = new Date(startTimestamp * 1000);
      const endDate = new Date(endTimestamp * 1000);
      
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      
      return startYear === endYear ? `${startYear}` : `${startYear}/${endYear}`;
    },
    
    tournamentSeasonBR: (state): string => {
      const startTimestamp = state.tournament?.uniqueTournament.startDateTimestamp;
      const endTimestamp = state.tournament?.uniqueTournament.endDateTimestamp;
      
      if (!startTimestamp || !endTimestamp) return '';
      
      const startDate = new Date(startTimestamp * 1000);
      const endDate = new Date(endTimestamp * 1000);
      
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      
      return startYear === endYear ? `Temporada ${startYear}` : `Temporada ${startYear}/${endYear}`;
    },
    
    formattedStartDate: (state): string => {
      const timestamp = state.tournament?.uniqueTournament.startDateTimestamp;
      if (!timestamp) return '';
      
      return new Date(timestamp * 1000).toLocaleDateString('pt-BR');
    },
    
    formattedEndDate: (state): string => {
      const timestamp = state.tournament?.uniqueTournament.endDateTimestamp;
      if (!timestamp) return '';
      
      return new Date(timestamp * 1000).toLocaleDateString('pt-BR');
    },
    
    isTournamentActive: (state): boolean => {
      const now = Date.now() / 1000;
      const start = state.tournament?.uniqueTournament.startDateTimestamp;
      const end = state.tournament?.uniqueTournament.endDateTimestamp;
      
      if (!start || !end) return false;
      
      return now >= start && now <= end;
    }
  },

  actions: {
    async fetchTournament(): Promise<void> {
      if (this.hasTournament) return;

      this.setLoading(true);
      this.setError(null);
      
      try {
        const tournament = await tournamentController.getTournamentDetails();
        this.setTournament(tournament);
      } catch (error) {
        this.setError(this.getErrorMessage(error));
      } finally {
        this.setLoading(false);
      }
    },

    async refreshTournament(): Promise<void> {
      this.setTournament(null);
      await this.fetchTournament();
    },

    setTournament(tournament: TournamentResponse | null): void {
      this.tournament = tournament;
    },

    setLoading(loading: boolean): void {
      this.loading = loading;
    },

    setError(error: string | null): void {
      this.error = error;
    },

    getErrorMessage(error: unknown): string {
      if (error instanceof Error) {
        return error.message;
      }
      
      if (typeof error === 'string') {
        return error;
      }
      
      return 'Erro ao carregar detalhes do torneio';
    },

    clearError(): void {
      this.setError(null);
    },

    clearTournament(): void {
      this.setTournament(null);
    },

    reset(): void {
      this.$reset();
    }
  }
});