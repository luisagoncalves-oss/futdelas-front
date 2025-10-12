<template>
  <ion-card class="season-card">
    <ion-card-header>
      <ion-card-title class="card-title">Temporada</ion-card-title>
    </ion-card-header>
    
    <ion-card-content>
      <div class="season-content">
        <div class="tournament-logo">
          <ion-avatar>
            <ion-img 
              :src="tournamentLogoUrl" 
              :alt="tournamentName"
              @ionError="setDefaultImage"
            />
          </ion-avatar>
        </div>

        <div class="tournament-info">
          <h2 class="tournament-name">{{ tournamentName }}</h2>
          
          <ion-badge :color="statusColor">
            {{ status }}
          </ion-badge>

          <div class="champion-section">
            <ion-avatar>
              <ion-img 
                :src="championLogoUrl" 
                alt="Campeão atual"
                @ionError="setDefaultImage"
              />
            </ion-avatar>
            <div class="champion-details">
              <strong>{{ championName }}</strong>
              <p>Atual campeão</p>
            </div>
          </div>
        </div>

        <div class="teams-count">
          <ion-icon :icon="peopleOutline"></ion-icon>
          <span>{{ totalTeams }} times</span>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonAvatar, 
  IonImg,
  IonBadge, 
  IonIcon
} from '@ionic/vue'
import { peopleOutline } from "ionicons/icons";
import { computed } from "vue";

interface Props {
  tournamentName?: string;
  championName?: string;
  tournamentLogoUrl?: string;
  championLogoUrl?: string;
  totalTeams?: number;
  status?: "Em andamento" | "Finalizado" | "Não iniciado";
}

const props = withDefaults(defineProps<Props>(), {
  tournamentName: "Brasileirão Feminino A1",
  championName: "Corinthians",
  tournamentLogoUrl: "../resources/br_feminino.png",
  championLogoUrl: "../resources/corinthians.png",
  totalTeams: 16,
  status: "Finalizado",
});

const statusColor = computed(() => {
  const colors = {
    "Em andamento": "success",
    "Finalizado": "medium",
    "Não iniciado": "medium"
  };
  return colors[props.status] || "medium";
});

const setDefaultImage = (event: any) => {
  event.target.src = '/assets/images/default-logo.png';
};
</script>

<style scoped>
.season-card {
  border-radius: 16px;
  margin: 16px 16px;
  box-shadow: 0 4px 12px rgba(106, 11, 223, 0.1);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ion-color-dark);
  margin-bottom: 12px;
}

.season-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.tournament-logo ion-avatar {
  width: 64px;
  height: 64px;
}

.tournament-info {
  flex: 1;
  min-width: 200px;
}

.tournament-name {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ion-color-dark);
}

.champion-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding: 12px;
  background: var(--ion-color-light-tint);
  border-radius: 12px;
}

.champion-section ion-avatar {
  width: 40px;
  height: 40px;
}

.champion-details {
  font-size: 0.9rem;
}

.champion-details p {
  margin: 2px 0 0 0;
  font-size: 0.8rem;
  color: var(--ion-color-medium);
}

.teams-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: var(--ion-color-primary);
  border-radius: 12px;
  color: #FFFF;
  font-weight: 600;
}

.teams-count ion-icon {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .season-content {
    gap: 12px;
  }
  
  .tournament-logo ion-avatar {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 480px) {
  .season-content {
    flex-direction: column;
    text-align: center;
  }
  
  .tournament-info {
    width: 100%;
  }
  
  .teams-count {
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
}
</style>