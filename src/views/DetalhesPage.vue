<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <div class="cards-container">
        <SeasonCard />

        <FavoriteTeam />
        
        <StandingsTable 
          :standings-data="classificacao" 
          :loading="false" 
          :error="false" 
        />
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
import { StandingsResponse } from '@/api/types/tournament-standings.type';
import { TournamentService } from '@/api/tournament.service';
import SeasonCard from '@/components/SeasonCard.vue';
import FavoriteTeam from '@/components/FavoriteTeam.vue';
import StandingsTable from '@/components/StandingsTable.vue';

const classificacao = ref<StandingsResponse>();
const loading = ref(true);
const error = ref<string | null>(null);

const fetchTournamentStandings = async () => {
  try {
    loading.value = true;
    error.value = null;
    classificacao.value = await TournamentService.getStandings();
  } catch (err) {
    console.error('Erro ao buscar classificação:', err);
    error.value = 'Não foi possível carregar a classificação. Tente novamente mais tarde.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchTournamentStandings();
});
</script>


<style scoped>
.cards-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 1rem; 
  padding: 1rem;
}

.cards-container > * {
  width: 100%;
  max-width: 500px; 
  box-sizing: border-box;
}
</style>