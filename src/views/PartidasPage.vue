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

// Mock data baseado no JSON fornecido
const mockEventsData = {
  "events": [
    {
      "id": 13592672,
      "homeTeam": {
        "teamId": null,
        "id": "312542",
        "name": "Palmeiras",
        "nameCode": "PAL",
        "teamColors": {
          "primary": "#339966",
          "secondary": "#336633",
          "text": "#336633"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "312739",
        "name": "Fluminense",
        "nameCode": "FLU",
        "teamColors": {
          "primary": "#660000",
          "secondary": "#006633",
          "text": "#006633"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592668,
      "homeTeam": {
        "teamId": null,
        "id": "342763",
        "name": "Real Brasília FC",
        "nameCode": "REA",
        "teamColors": {
          "primary": "#0a87f9",
          "secondary": "#16115f",
          "text": "#16115f"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "248726",
        "name": "Grêmio",
        "nameCode": "GRE",
        "teamColors": {
          "primary": "#3399ff",
          "secondary": "#000033",
          "text": "#000033"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592670,
      "homeTeam": {
        "teamId": null,
        "id": "396744",
        "name": "EC Juventude",
        "nameCode": "JUV",
        "teamColors": {
          "primary": "#374df5",
          "secondary": "#374df5",
          "text": "#ffffff"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "312545",
        "name": "São Paulo",
        "nameCode": "SAO",
        "teamColors": {
          "primary": "#ffffff",
          "secondary": "#000000",
          "text": "#000000"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592669,
      "homeTeam": {
        "teamId": null,
        "id": "312544",
        "name": "Cruzeiro",
        "nameCode": "CRU",
        "teamColors": {
          "primary": "#0033cc",
          "secondary": "#ffffff",
          "text": "#ffffff"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "248717",
        "name": "Sport Recife",
        "nameCode": "REC",
        "teamColors": {
          "primary": "#cc0000",
          "secondary": "#000000",
          "text": "#000000"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592667,
      "homeTeam": {
        "teamId": null,
        "id": "223371",
        "name": "Ferroviária",
        "nameCode": "FER",
        "teamColors": {
          "primary": "#9c271a",
          "secondary": "#ffffff",
          "text": "#ffffff"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "368297",
        "name": "Red Bull Bragantino",
        "nameCode": "RBB",
        "teamColors": {
          "primary": "#363636",
          "secondary": "#d8d8d6",
          "text": "#d8d8d6"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592671,
      "homeTeam": {
        "teamId": null,
        "id": "248722",
        "name": "Flamengo",
        "nameCode": "FLA",
        "teamColors": {
          "primary": "#ff0000",
          "secondary": "#000000",
          "text": "#000000"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "286246",
        "name": "América Mineiro",
        "nameCode": "AME",
        "teamColors": {
          "primary": "#056635",
          "secondary": "#ffffff",
          "text": "#ffffff"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592666,
      "homeTeam": {
        "teamId": null,
        "id": "284444",
        "name": "3B Sport",
        "nameCode": "3B",
        "teamColors": {
          "primary": "#0000ff",
          "secondary": "#d90015",
          "text": "#d90015"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "342756",
        "name": "EC Bahia",
        "nameCode": "BAH",
        "teamColors": {
          "primary": "#ffffff",
          "secondary": "#333399",
          "text": "#333399"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592675,
      "homeTeam": {
        "teamId": null,
        "id": "311632",
        "name": "Internacional",
        "nameCode": "INT",
        "teamColors": {
          "primary": "#cc0000",
          "secondary": "#000000",
          "text": "#000000"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "223182",
        "name": "Corinthians",
        "nameCode": "COR",
        "teamColors": {
          "primary": "#ffffff",
          "secondary": "#000000",
          "text": "#000000"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 14
      }
    },
    {
      "id": 13592698,
      "homeTeam": {
        "teamId": null,
        "id": "368297",
        "name": "Red Bull Bragantino",
        "nameCode": "RBB",
        "teamColors": {
          "primary": "#363636",
          "secondary": "#d8d8d6",
          "text": "#d8d8d6"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "284444",
        "name": "3B Sport",
        "nameCode": "3B",
        "teamColors": {
          "primary": "#0000ff",
          "secondary": "#d90015",
          "text": "#d90015"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 15
      }
    },
    {
      "id": 13592679,
      "homeTeam": {
        "teamId": null,
        "id": "312739",
        "name": "Fluminense",
        "nameCode": "FLU",
        "teamColors": {
          "primary": "#660000",
          "secondary": "#006633",
          "text": "#006633"
        },
        "manager": null
      },
      "awayTeam": {
        "teamId": null,
        "id": "342763",
        "name": "Real Brasília FC",
        "nameCode": "REA",
        "teamColors": {
          "primary": "#0a87f9",
          "secondary": "#16115f",
          "text": "#16115f"
        },
        "manager": null
      },
      "season": {
        "id": 73097,
        "name": "Brasileirão Feminino 2025",
        "year": "2025"
      },
      "status": {
        "code": 100,
        "description": "Ended",
        "type": "finished"
      },
      "roundInfo": {
        "round": 15
      },
    }
  ],
  "hasNextPage": true
};

const currentPage = ref(1);
const allEvents = ref<any[]>([]); 

const paginatedEvents = computed(() => {
  const startIndex = (currentPage.value - 1) * 10;
  return allEvents.value.slice(startIndex, startIndex + 10);
});

const hasNextPage = computed(() => {
  return allEvents.value.length > currentPage.value * 10;
});

// Função mock para substituir a chamada de API
const fetchTournamentLastMatches = async (page: number = 1) => {
  try {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (page === 1) {
      allEvents.value = mockEventsData.events;
    }
    
    currentPage.value = page;
  } catch (error) {
    console.error("Erro ao buscar partidas:", error);
    throw error;
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
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

    await Share.share({
      title: 'Resultado da Partida',
      text: shareText,
    });
    
  } catch (e) {
    console.log("Erro ao compartilhar:", e);
  }
}

onMounted(() => {
  fetchTournamentLastMatches(1);
});
</script>

<style scoped>
/* Estilos para a paginação */
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