import { defineStore } from 'pinia';
import { TeamResponse } from '../types';
import { TeamController } from '../controller/index.controller';

interface TeamState {
  teams: TeamResponse[];
  favoriteTeamId: number | null; 
  currentTeam: TeamResponse | null;
  loading: boolean;
  error: string | null;
}

export const useTeamStore = defineStore('team', {
  state: (): TeamState => ({
    teams: [],
    favoriteTeamId: null,
    currentTeam: null,
    loading: false,
    error: null
  }),

  getters: {
    hasTeams: (state) => state.teams.length > 0,
    teamsCount: (state) => state.teams.length,
    
    getTeamById: (state) => (teamId: number) => 
      state.teams.find(team => team.id === teamId),
    
    isTeamFavorite: (state) => (teamId: number) => 
      state.favoriteTeamId === teamId,
    
    favoriteTeam: (state) => 
      state.favoriteTeamId ? state.teams.find(team => team.id === state.favoriteTeamId) : null,
    
    hasFavoriteTeam: (state) => state.favoriteTeamId !== null
  },

  actions: {
    async fetchAllTeams(): Promise<void> {
      if (this.hasTeams) return;

      this.loading = true;
      
      try {
        const teams = await TeamController.getAllTeams();
        this.teams = teams;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro desconhecido';
      } finally {
        this.loading = false;
      }
    },

    async fetchTeamById(teamId: number): Promise<void> {
      const cachedTeam = this.getTeamById(teamId);
      if (cachedTeam) {
        this.currentTeam = cachedTeam;
        return;
      }

      this.loading = true;
      
      try {
        const team = await TeamController.getTeamById(teamId);
        this.currentTeam = team;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro desconhecido';
      } finally {
        this.loading = false;
      }
    },

    setFavoriteTeam(teamId: number): void {
      if (this.favoriteTeamId === teamId) {
        this.favoriteTeamId = null;
        localStorage.removeItem('favoriteTeamId');
      } else {
        this.favoriteTeamId = teamId;
        localStorage.setItem('favoriteTeamId', teamId.toString());
      }
    },

    loadFavoriteTeamFromStorage(): void {
      const savedFavoriteTeamId = localStorage.getItem('favoriteTeamId');
      if (savedFavoriteTeamId) {
        this.favoriteTeamId = parseInt(savedFavoriteTeamId, 10);
      }
    },

    clearFavoriteTeam(): void {
      this.favoriteTeamId = null;
      localStorage.removeItem('favoriteTeamId');
    },

    clearError(): void {
      this.error = null;
    },

    clearCurrentTeam(): void {
      this.currentTeam = null;
    },

    reset(): void {
      this.$reset();
      localStorage.removeItem('favoriteTeamId');
    }
  }
});