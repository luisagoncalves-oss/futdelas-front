<template>
  <ion-page>
    <ion-content>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonContent, 
  IonFooter, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonLabel, 
  IonTitle 
} from '@ionic/vue';
import { onMounted, ref, computed } from 'vue';
import MatchCard from '@/components/MatchCard.vue';
import { Share } from '@capacitor/share';
import { EventsResponse, Event } from '@/api/types/tournament-last-matches.type';
import { TournamentService } from '@/api/tournament.service';

const currentPage = ref(1);
const allEvents = ref<Event[]>([]); 
const hasNextPageData = ref(false);
const isLoading = ref(false);

const paginatedEvents = computed(() => {
  return allEvents.value;
});

const hasNextPage = computed(() => {
  return hasNextPageData.value;
});

const fetchTournamentLastMatches = async (page: number = 1) => {
  try {
    isLoading.value = true;
    
    const pageIndex = page - 1;
    
    const response: EventsResponse = await TournamentService.getLastMatches(pageIndex);
    
    allEvents.value = response.events;
    hasNextPageData.value = response.hasNextPage;
    currentPage.value = page;
    
  } catch (error) {
    console.error("Erro ao buscar partidas:", error);
  } finally {
    isLoading.value = false;
  }
};

const goToNextPage = async () => {
  if (hasNextPage.value) {
    await fetchTournamentLastMatches(currentPage.value + 1);
  }
};

const goToPreviousPage = async () => {
  if (currentPage.value >= 1) {
    await fetchTournamentLastMatches(currentPage.value - 1);
  }
};

const share = async (match: Event) => {
  try {
    const statusMap: Record<string, string> = {
      'Ended': 'Encerrado',
      'Finished': 'Encerrado',
      'Live': 'Ao Vivo',
      'Scheduled': 'Agendado',
      'Postponed': 'Adiado',
      'Cancelled': 'Cancelado'
    };

    const status = statusMap[match.status.description] || match.status.description;
    
    const placar = match.homeScore && match.awayScore 
      ? `${match.homeScore.display} × ${match.awayScore.display}`
      : 'vs';

    const shareText = `${match.homeTeam.name} ${placar} ${match.awayTeam.name}

${match.season.name} • Rodada ${match.roundInfo.round}
Status: ${status}

───
Acompanhe o campeonato completo no FutDelas
Resultados, classificação e estatísticas do futebol feminino brasileiro

#FutebolFeminino #BrasileirãoFeminino`;

    await Share.share({
      title: 'FutDelas | Brasileirão Feminino',
      text: shareText,
      dialogTitle: 'Compartilhar'
    });
    
  } catch (e) {
    console.error("Erro ao compartilhar partida:", e);
  }
};

onMounted(() => {
  fetchTournamentLastMatches(1);
});
</script>

<style scoped>
ion-footer {
  background: linear-gradient(135deg, #ffffff 0%, #faf9ff 100%);
  border-top: 1px solid rgba(106, 11, 223, 0.08);
}

ion-toolbar {
  --background: transparent;
}

ion-button {
  --color: #6a0bdf;
  font-weight: 600;
}

ion-button:disabled {
  --color: #6c757d;
  opacity: 0.5;
}

ion-title {
  font-weight: 600;
  color: #2d1b69;
}
</style>