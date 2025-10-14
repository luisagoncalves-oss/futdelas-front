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
import SeasonCard from '@/components/SeasonCard.vue';
import FavoriteTeam from '@/components/FavoriteTeam.vue';
import StandingsTable from '@/components/StandingsTable.vue';

const mockStandingsData: StandingsResponse = {
  "standings": [
    {
      "id": 161850,
      "type": "total",
      "name": "Brasileiro A1, Women 2025",
      "updatedAtTimestamp": 20250311050022,
      "rows": [
        {
          "id": 1472956,
          "team": {
            "teamId": "467e21e5-00e4-4637-9aa6-01ba1c426837",
            "id": 31254,
            "name": "Cruzeiro",
            "nameCode": "CRU",
            "teamColors": {
              "primary": "#0033cc",
              "secondary": "#ffffff",
              "text": "#ffffff"
            },
          },
          "position": 1,
          "matches": 15,
          "wins": 11,
          "scoresFor": 35,
          "scoresAgainst": 15,
          "losses": 1,
          "draws": 3,
          "points": 36
        },
        {
          "id": 1472965,
          "team": {
            "teamId": "c388b6a5-0469-4ca2-adba-b3219aa4ec82",
            "id": 223182,
            "name": "Corinthians",
            "nameCode": "COR",
            "teamColors": {
              "primary": "#ffffff",
              "secondary": "#000000",
              "text": "#000000"
            },
          },
          "position": 2,
          "matches": 15,
          "wins": 10,
          "scoresFor": 46,
          "scoresAgainst": 12,
          "losses": 1,
          "draws": 4,
          "points": 34
        },
        {
          "id": 1472964,
          "team": {
            "teamId": "869b1883-fab1-4716-a747-2d8035dec7c8",
            "id": 312545,
            "name": "São Paulo",
            "nameCode": "SAO",
            "teamColors": {
              "primary": "#ffffff",
              "secondary": "#000000",
              "text": "#000000"
            },
          },
          "position": 3,
          "matches": 15,
          "wins": 10,
          "scoresFor": 31,
          "scoresAgainst": 10,
          "losses": 2,
          "draws": 3,
          "points": 33
        },
        {
          "id": 1472968,
          "team": {
            "teamId": "3c3dccce-0c2b-4ef4-96ec-ecfdc9c7055a",
            "id": 312542,
            "name": "Palmeiras",
            "nameCode": "PAL",
            "teamColors": {
              "primary": "#339966",
              "secondary": "#336633",
              "text": "#336633"
            },
          },
          "position": 4,
          "matches": 15,
          "wins": 9,
          "scoresFor": 38,
          "scoresAgainst": 20,
          "losses": 3,
          "draws": 3,
          "points": 30
        },
        {
          "id": 1472955,
          "team": {
            "teamId": "ff976da0-193d-4d2c-90c8-c56e1851af84",
            "id": 248722,
            "name": "Flamengo",
            "nameCode": "FLA",
            "teamColors": {
              "primary": "#ff0000",
              "secondary": "#000000",
              "text": "#000000"
            },
          },
          "position": 5,
          "matches": 15,
          "wins": 8,
          "scoresFor": 31,
          "scoresAgainst": 19,
          "losses": 4,
          "draws": 3,
          "points": 27
        },
        {
          "id": 1472959,
          "team": {
            "teamId": "3f0ec6c2-3acb-4594-a5ce-d9ffcbc97c80",
            "id": 223371,
            "name": "Ferroviária",
            "nameCode": "FER",
            "teamColors": {
              "primary": "#9c271a",
              "secondary": "#ffffff",
              "text": "#ffffff"
            },
          },
          "position": 6,
          "matches": 15,
          "wins": 7,
          "scoresFor": 24,
          "scoresAgainst": 16,
          "losses": 4,
          "draws": 4,
          "points": 25
        },
        {
          "id": 1472957,
          "team": {
            "teamId": "88cc56bc-c062-4943-a5b2-752d7f48b84a",
            "id": 342756,
            "name": "EC Bahia",
            "nameCode": "BAH",
            "teamColors": {
              "primary": "#ffffff",
              "secondary": "#333399",
              "text": "#333399"
            },
          },
          "position": 7,
          "matches": 15,
          "wins": 7,
          "scoresFor": 26,
          "scoresAgainst": 22,
          "losses": 5,
          "draws": 3,
          "points": 24
        },
        {
          "id": 1472963,
          "team": {
            "teamId": "8575cef9-437e-43ce-85e1-4a3fc8804fb1",
            "id": 368297,
            "name": "Red Bull Bragantino",
            "nameCode": "RBB",
            "teamColors": {
              "primary": "#363636",
              "secondary": "#d8d8d6",
              "text": "#d8d8d6"
            },
          },
          "position": 8,
          "matches": 15,
          "wins": 5,
          "scoresFor": 20,
          "scoresAgainst": 16,
          "losses": 5,
          "draws": 5,
          "points": 20
        },
        {
          "id": 1472954,
          "team": {
            "teamId": "f751199c-e6ac-4c00-93c6-9327957263ba",
            "id": 286246,
            "name": "América Mineiro",
            "nameCode": "AME",
            "teamColors": {
              "primary": "#056635",
              "secondary": "#ffffff",
              "text": "#ffffff"
            },
          },
          "position": 9,
          "matches": 15,
          "wins": 5,
          "scoresFor": 18,
          "scoresAgainst": 20,
          "losses": 6,
          "draws": 4,
          "points": 19
        },
        {
          "id": 1472960,
          "team": {
            "teamId": "1b189000-c5dd-4924-b404-2c9b856b8eb5",
            "id": 312739,
            "name": "Fluminense",
            "nameCode": "FLU",
            "teamColors": {
              "primary": "#660000",
              "secondary": "#006633",
              "text": "#006633"
            },
          },
          "position": 10,
          "matches": 15,
          "wins": 4,
          "scoresFor": 18,
          "scoresAgainst": 20,
          "losses": 5,
          "draws": 6,
          "points": 18
        },
        {
          "id": 1472961,
          "team": {
            "teamId": "43d1d998-c925-4abe-99ec-6bc9ef8015cb",
            "id": 248726,
            "name": "Grêmio",
            "nameCode": "GRE",
            "teamColors": {
              "primary": "#3399ff",
              "secondary": "#000033",
              "text": "#000033"
            },
          },
          "position": 11,
          "matches": 15,
          "wins": 3,
          "scoresFor": 23,
          "scoresAgainst": 21,
          "losses": 4,
          "draws": 8,
          "points": 17
        },
        {
          "id": 1472966,
          "team": {
            "teamId": "2d2ee505-d5e4-4696-bd7a-2da6cd80c1cf",
            "id": 311632,
            "name": "Internacional",
            "nameCode": "INT",
            "teamColors": {
              "primary": "#cc0000",
              "secondary": "#000000",
              "text": "#000000"
            },
          },
          "position": 12,
          "matches": 15,
          "wins": 3,
          "scoresFor": 17,
          "scoresAgainst": 29,
          "losses": 7,
          "draws": 5,
          "points": 14
        },
        {
          "id": 1472962,
          "team": {
            "teamId": "a3ab031d-aff0-4472-93e0-e5829d30d092",
            "id": 342763,
            "name": "Real Brasília FC",
            "nameCode": "REA",
            "teamColors": {
              "primary": "#0a87f9",
              "secondary": "#16115f",
              "text": "#16115f"
            },
          },
          "position": 13,
          "matches": 15,
          "wins": 3,
          "scoresFor": 15,
          "scoresAgainst": 36,
          "losses": 9,
          "draws": 3,
          "points": 12
        },
        {
          "id": 1472958,
          "team": {
            "teamId": "82a860c0-80d1-4e60-ae5a-67499c07fcbf",
            "id": 396744,
            "name": "EC Juventude",
            "nameCode": "JUV",
            "teamColors": {
              "primary": "#374df5",
              "secondary": "#374df5",
              "text": "#ffffff"
            },
          },
          "position": 14,
          "matches": 15,
          "wins": 2,
          "scoresFor": 10,
          "scoresAgainst": 27,
          "losses": 9,
          "draws": 4,
          "points": 10
        },
        {
          "id": 1472953,
          "team": {
            "teamId": "2798f17b-5aaf-46c1-8d1d-dd38e663c6a8",
            "id": 284444,
            "name": "3B Sport",
            "nameCode": "3B",
            "teamColors": {
              "primary": "#0000ff",
              "secondary": "#d90015",
              "text": "#d90015"
            },
          },
          "position": 15,
          "matches": 15,
          "wins": 2,
          "scoresFor": 11,
          "scoresAgainst": 53,
          "losses": 12,
          "draws": 1,
          "points": 7
        },
        {
          "id": 1472967,
          "team": {
            "teamId": "704e29b4-2513-497c-a1d3-d100e710161f",
            "id": 248717,
            "name": "Sport Recife",
            "nameCode": "REC",
            "teamColors": {
              "primary": "#cc0000",
              "secondary": "#000000",
              "text": "#000000"
            },
          },
          "position": 16,
          "matches": 15,
          "wins": 0,
          "scoresFor": 9,
          "scoresAgainst": 36,
          "losses": 12,
          "draws": 3,
          "points": 3
        }
      ]
    }
  ]
};

const classificacao = ref<StandingsResponse>();

const fetchTournamentStandings = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    classificacao.value = mockStandingsData;
  } catch (error) {
    console.error('Erro ao buscar classificação:', error);
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
  align-items: center; /* Centraliza horizontalmente */
  gap: 1rem; /* Espaçamento entre os cards */
  padding: 1rem;
}

.cards-container > * {
  width: 100%;
  max-width: 500px; /* largura fixa para todos os cards */
  box-sizing: border-box;
}
</style>