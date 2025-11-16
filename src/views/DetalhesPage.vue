<!-- Sua página principal -->
<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <div class="cards-container">
        <div class="loading" v-if="loading && loadingRows">
          <Text 
            content="Carregando detalhes do campeonato..." 
            element="span" 
            size="sm" 
            weight="regular" 
            color="dark"
          />
        </div>

        <div class="error" v-else-if="error || isError">
          <Text 
            content="Erro ao carregar detalhes do campeonato." 
            element="span" 
            size="sm" 
            weight="regular" 
            color="dark"
          />
          <button @click="handleRetry" class="retry-button">
            Tentar novamente
          </button>
        </div>

        <div v-else>
          <Tournament
            :name="tournamentName"
            :season="tournamentSeason"
            :titleHolder="tournamentTitleHolder"
            :isActive="isTournamentActive"
            :startDate="formattedStartDate"
            :endDate="formattedEndDate"
          />

          <FavoriteTeam :team="favoriteTeam"/>
          
          <StandingsTable :data="standingsRows" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent
} from '@ionic/vue'
import { onMounted, ref } from 'vue'
import Tournament from '@/tournament/index.component.vue';
import StandingsTable from '@/standings/index.component.vue';
import { useStandings } from '@/standings/composables/useStandings';
import Text from '@/components/text/index.component.vue'
import { useTournament } from '@/tournament/composable/useTournament';
import FavoriteTeam from  '@/favorite-team/index.component.vue';
import { useFavoriteTeam } from '@/team/composable/useFavoriteTeam';
import { TeamResponse } from '@/team/types';

const {
  standingsRows,
  loadingRows,
  isError,
  fetchStandings,
  clearError
} = useStandings();

const {
  tournamentName,
  tournamentSeason,
  tournamentTitleHolder,
  formattedStartDate,
  formattedEndDate,
  isTournamentActive,
  loading,
  error,
  clearErrors,
  fetchTournament
} = useTournament();

const handleRetry = () => {
  clearError()
  clearErrors()
  fetchTournament()
  fetchStandings()
}
 
const  {
  favoriteTeam,
  hasFavoriteTeam,
} = useFavoriteTeam();

const team = ref<TeamResponse>({
  id: 0,
  name: '',
  nameCode: '',
  teamColors: {
    primary: '',
    secondary: '',
    text: ''
  },
  manager: {
    name: ''
  },
  pregameForm: {
    position: 0
  }
});

const handleFavoriteTeam = () => {
  if (hasFavoriteTeam && favoriteTeam.value) {
    team.value = favoriteTeam.value as TeamResponse;
  }
}

onMounted(() => {
  fetchStandings();
  fetchTournament();
  handleFavoriteTeam();
})
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.cards-container > * {
  width: 100%;
  max-width: 500px; 
  box-sizing: border-box;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  color: var(--ion-color-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.retry-button {
  background: none;
  border: none;
  color: var(--ion-color-primary);
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

.retry-button:hover {
  opacity: 0.7;
}
</style>