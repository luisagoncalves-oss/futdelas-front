<template>
  <ion-page>
    <ion-content :scroll-events="true">
      <SeasonCard :tournament-name="campeonato?.uniqueTournament.name"
        :champion-name="campeonato?.uniqueTournament.titleHolder.name"/>

      <FavoriteTeam />
      
      <StandingsTable :standings-data="classificacao" :loading="false" :error="false" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent
} from '@ionic/vue'
import { TournamentService } from '@/api/tournament.service';
import { onMounted, ref } from 'vue'
import { TournamentDetails } from '@/api/types/tournament-details.type';
import { StandingsResponse } from '@/api/types/tournament-standings.type';
import SeasonCard from '@/components/SeasonCard.vue';
import FavoriteTeam from '@/components/FavoriteTeam.vue';
import StandingsTable from '@/components/StandingsTable.vue';

const campeonato = ref<TournamentDetails>();
const fetchTournamentDetails = async () => {
  try {
    const result = await TournamentService.getTournamentDetails();
    if (result) {
      campeonato.value = result;
    }
  } catch (error) {
    throw error;
  }
}

const classificacao = ref<StandingsResponse>();
const fetchTournamentStandings = async () => {
  try {
    const result = await TournamentService.getStandings();
    if (result) {
      classificacao.value = result;
    }
  } catch (error) {
    throw error;
  }
}


onMounted(() => {
  fetchTournamentStandings();
  fetchTournamentDetails();
});
</script>
