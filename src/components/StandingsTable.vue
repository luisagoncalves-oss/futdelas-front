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
            <span class="nome-time">{{ row.team?.name }}</span>
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
.card-classificacao {
  border-radius: 12px;
  margin: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  overflow: hidden;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e1e1e;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 6px;
}

.tabela-container {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  background: #fff;
  -webkit-overflow-scrolling: touch;
}

.cabecalho-tabela,
.linha-time {
  display: grid;
  grid-template-columns: 32px minmax(120px, 1fr) 28px 28px 28px 28px 28px 28px 36px;
  gap: 4px;
  align-items: center;
  min-width: fit-content;
}

.cabecalho-tabela {
  background: #f5f5f7;
  color: #4b4b4b;
  padding: 8px 6px;
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.2px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1;
}

.linha-time {
  padding: 8px 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 0.75rem;
  transition: background 0.2s ease;
}

.linha-time:hover {
  background: rgba(106, 11, 223, 0.04);
}

.coluna-posicao,
.coluna-numero,
.coluna-pontos {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 600;
}

.coluna-time {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 0 8px;
  text-align: left;
}

.coluna-numero {
  color: #333;
  font-size: 0.7rem;
}

.coluna-pontos {
  color: #6A0BDF;
  font-weight: 700;
}

.nome-time {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  color: #222;
  width: 100%;
}

.position-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #fff;
}

.position-badge.qualification { background: #27ae60; }
.position-badge.playoff { background: #f39c12; }
.position-badge.relegation { background: #eb445a; }
.position-badge.neutral { background: #a0a0a0; }

@media (min-width: 576px) {
  .card-classificacao {
    margin: 16px;
    border-radius: 16px;
  }

  .card-title {
    font-size: 1.1rem;
    padding-bottom: 8px;
  }

  .cabecalho-tabela,
  .linha-time {
    grid-template-columns: 40px minmax(140px, 1fr) 32px 32px 32px 32px 32px 32px 40px;
    gap: 6px;
  }

  .cabecalho-tabela {
    padding: 12px 8px;
    font-size: 0.75rem;
  }

  .linha-time {
    padding: 10px 8px;
    font-size: 0.8rem;
  }

  .coluna-numero {
    font-size: 0.75rem;
  }

  .position-badge {
    width: 22px;
    height: 22px;
    font-size: 0.75rem;
  }
}

@media (min-width: 768px) {
  .cabecalho-tabela,
  .linha-time {
    grid-template-columns: 45px minmax(160px, 1fr) 36px 36px 36px 36px 36px 36px 45px;
    gap: 8px;
  }

  .cabecalho-tabela {
    font-size: 0.8rem;
  }

  .linha-time {
    font-size: 0.85rem;
  }

  .coluna-numero {
    font-size: 0.8rem;
  }
}
</style>