<template>
  <ion-card class="card-classificacao">
    <ion-card-header>
      <ion-card-title class="card-title">Classificação</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <div class="tabela-container">
        <div class="cabecalho-tabela">
          <div class="coluna-posicao">#</div>
          <div class="coluna-time">Equipe</div>
          <div class="coluna-numero">J</div>
          <div class="coluna-numero">V</div>
          <div class="coluna-numero">E</div>
          <div class="coluna-numero">D</div>
          <div class="coluna-numero">GP</div>
          <div class="coluna-numero">GC</div>
          <div class="coluna-pontos">PTS</div>
        </div>

        <div 
          v-for="row in standings[0]?.rows" 
          :key="row.id"
          class="linha-time"
          :class="{ 
            'linha-par': row.position % 2 === 0,
            'zona-libertadores': row.position <= 4,
            'zona-rebaixamento': row.position > (standings[0]?.rows?.length || 16) - 4
          }"
        >
          <div class="coluna-posicao">
            <span class="position-badge" :class="getPositionBadgeClass(row.position)">
              {{ row.position }}
            </span>
          </div>
          <div class="coluna-time">
            <div class="time-info">
              <span class="nome-time">{{ row.team?.name }}</span>
            </div>
          </div>
          <div class="coluna-numero">{{ row.matches }}</div>
          <div class="coluna-numero">{{ row.wins }}</div>
          <div class="coluna-numero">{{ row.draws }}</div>
          <div class="coluna-numero">{{ row.losses }}</div>
          <div class="coluna-numero">{{ row.scoresFor }}</div>
          <div class="coluna-numero">{{ row.scoresAgainst }}</div>
          <div class="coluna-pontos">{{ row.points }}</div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/vue";
import { computed } from "vue";
import { StandingsResponse } from "@/api/types/tournament-standings.type";

interface Props {
  standingsData?: StandingsResponse;
}

const props = withDefaults(defineProps<Props>(), {
  standingsData: undefined
});

const standings = computed(() => props.standingsData?.standings || []);

const getPositionBadgeClass = (position: number): string => {
  if (position <= 4) return "qualification";
  if (position <= 8) return "playoff";
  if (position >= 13) return "relegation";
  return "neutral";
};
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ion-color-dark);
  margin-bottom: 12px;
}

.card-classificacao {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 16px;
  margin-bottom: 24px;
}

.tabela-container {
  width: 100%;
  border-radius: 8px;
  overflow: auto;
}

.cabecalho-tabela {
  display: flex;
  background-color: var(--ion-color-primary);
  color: white;
  padding: 12px 8px;
  font-weight: 600;
  border-radius: 8px 8px 0 0;
  min-width: 600px;
  font-size: 0.8rem;
}

.linha-time {
  display: flex;
  padding: 10px 8px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  min-width: 600px;
  font-size: 0.85rem;
}

.linha-par {
  background-color: #f9f9f9;
}

.zona-libertadores {
  background-color: rgba(0, 128, 0, 0.08);
  border-left: 3px solid var(--ion-color-success);
}

.zona-rebaixamento {
  background-color: rgba(235, 68, 90, 0.08);
  border-left: 3px solid var(--ion-color-danger);
}

.coluna-posicao {
  flex: 0.5;
  text-align: center;
  font-weight: 600;
  display: flex;
  justify-content: center;
}

.coluna-time {
  flex: 3;
  min-width: 0;
}

.coluna-numero {
  flex: 0.8;
  text-align: center;
  font-weight: 500;
}

.coluna-pontos {
  flex: 1;
  text-align: center;
  font-weight: 700;
  color: var(--ion-color-primary);
}

.time-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nome-time {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.position-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
}

.position-badge.qualification {
  background: var(--ion-color-success);
}

.position-badge.playoff {
  background: var(--ion-color-warning);
}

.position-badge.relegation {
  background: var(--ion-color-danger);
}

.position-badge.neutral {
  background: var(--ion-color-medium);
}

@media (max-width: 768px) {
  .tabela-container {
    overflow-x: auto;
  }
  
  .cabecalho-tabela,
  .linha-time {
    min-width: 550px;
    font-size: 0.75rem;
  }
  
  .coluna-time {
    flex: 2.5;
  }
  
  .coluna-numero {
    flex: 0.7;
  }
  
  .nome-time {
    max-width: 120px;
  }
}

@media (max-width: 480px) {
  .card-classificacao {
    margin: 12px;
    margin-bottom: 16px;
  }
  
  .cabecalho-tabela,
  .linha-time {
    min-width: 500px;
    padding: 8px 4px;
  }
  
  .coluna-time {
    flex: 2;
  }
  
  .coluna-numero {
    flex: 0.6;
    font-size: 0.7rem;
  }
  
  .nome-time {
    max-width: 100px;
    font-size: 0.75rem;
  }
  
  .coluna-numero {
    min-width: 24px;
  }
  
  .coluna-pontos {
    min-width: 30px;
  }
}

@media (max-width: 360px) {
  .cabecalho-tabela,
  .linha-time {
    min-width: 460px;
    font-size: 0.7rem;
  }
  
  .coluna-time {
    flex: 1.8;
  }
  
  .coluna-numero {
    flex: 0.5;
    min-width: 22px;
  }
  
  .nome-time {
    max-width: 90px;
    font-size: 0.7rem;
  }
}
</style>