<template>
  <ion-page>
    <MatchCard 
      v-for="event in paginatedEvents" 
      :key="event.id" 
      :match="event" 
      @shareMatch="share(event)"
    />

    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button 
            fill="clear" 
            :disabled="currentPage === 1" 
            @click="goToPreviousPage"
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
            <ion-label>Anterior</ion-label>
          </ion-button>
        </ion-buttons>

        <ion-title class="ion-text-center">
          {{ currentPage }}
        </ion-title>

        <ion-buttons slot="end">
          <ion-button 
            fill="clear" 
            :disabled="!hasNextPage" 
            @click="goToNextPage"
          >
            <ion-label>Próxima</ion-label>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { TournamentService } from '@/api/tournament.service';
import { EventsResponse } from '@/api/types/tournament-last-matches.type';
import { onMounted, ref, computed } from 'vue';
import MatchCard from '@/components/MatchCard.vue';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
import { Share } from '@capacitor/share';

const partidas = ref<EventsResponse>();
const currentPage = ref(1);
const allEvents = ref<any[]>([]); 

const paginatedEvents = computed(() => {
  const startIndex = (currentPage.value - 1) * 10;
  return allEvents.value.slice(startIndex, startIndex + 10);
});

const hasNextPage = computed(() => {
  return partidas.value?.hasNextPage || 
         allEvents.value.length > currentPage.value * 10;
});

const fetchTournamentLastMatches = async (page: number = 1) => {
  try {
    if (page === 1 || allEvents.value.length < page * 10) {
      const result = await TournamentService.getLastMatches(page - 1);
      partidas.value = result;
      
      if (result?.events) {
        if (page === 1) {
          allEvents.value = result.events;
        } else {
          allEvents.value = [...allEvents.value, ...result.events];
        }
      }
    }
    
    currentPage.value = page;
  } catch (error) {
    console.error("Erro ao buscar partidas:", error);
    throw error;
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    fetchTournamentLastMatches(currentPage.value + 1);
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const share = async (match: any) => {
  try {
    const shareText = `⚽ ${match.homeTeam.name} vs ${match.awayTeam.name}
🏆 ${match.season.name}
📅 Rodada ${match.roundInfo.round}
✅ ${match.status.description}`;

    // Tenta Capacitor Share (funciona em mais plataformas)
    await Share.share({
      title: 'Resultado da Partida',
      text: shareText,
    });
    
  } catch (e) {
    console.log("Erro ao compartilhar com Capacitor:", e);
  }
}

onMounted(() => {
  fetchTournamentLastMatches(1);
});
</script>