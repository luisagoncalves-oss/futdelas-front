<template>
  <ion-card class="favorite-card" v-if="showCard && timeFavorito">
    <ion-card-header>
      <ion-card-title class="card-title">Time favorito</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="card-content">
        <div class="team-section">
          <ion-avatar class="team-logo">
            <ion-img 
              :src="timeFavorito.logo || '/default-logo.png'" 
              :alt="`Logo do ${timeFavorito.name}`"
            />
          </ion-avatar>
          <p class="team-name">{{ timeFavorito.name }}</p>
        </div>

        <div class="info-section">
          <div class="info-item">
            <ion-icon :icon="pinOutline"></ion-icon>
            <div class="info-content">
              <span class="info-label">Posição</span>
              <span class="info-value">{{ teamPosition }}</span>
            </div>
          </div>

          <div class="info-item">
            <ion-icon :icon="timeOutline"></ion-icon>
            <div class="info-content">
              <span class="info-label">Próxima partida</span>
              <div class="match-info">
                <span class="match-date">{{ nextMatchDate }}</span>
                <span class="match-time">{{ nextMatchTime }}</span>
              </div>
            </div>
          </div>
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
  IonIcon
} from '@ionic/vue'
import { pinOutline, timeOutline } from "ionicons/icons";
import { TeamService } from '@/api/team.service';
import { onMounted, ref, computed } from 'vue';
import { FavoriteTeamService } from '@/api/favoriteTeam.service';

// Definir interface para o time
interface Team {
  id: string;
  name: string;
  logo?: string;
  position?: number;
  // adicione outras propriedades que a API retorna
}

// Props (se necessário receber alguma prop)
interface Props {
  userId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  userId: '12345'
});

// Refs
const timeFavorito = ref<Team | any>(null);
const showCard = ref(false);

// Computed properties para os dados derivados
const teamName = computed(() => timeFavorito.value?.name || 'Time não encontrado');
const teamPosition = computed(() => timeFavorito.value?.position ? `${timeFavorito.value.position}º` : 'Não disponível');
const nextMatchDate = computed(() => '15/03/2024'); // Substitua com dados reais
const nextMatchTime = computed(() => '16:00'); // Substitua com dados reais

// Métodos
const fetchFavoriteTeam = async () => {
  try {
    const result = await FavoriteTeamService.getFavoriteTeam(props.userId);
    
    if (result?.teamId) {
      const teamDetails = await TeamService.getTeamDetails(result.teamId);
      timeFavorito.value = teamDetails;
      showCard.value = true;
    } else {
      showCard.value = false;
      timeFavorito.value = null;
    }
  } catch (error) {
    console.error('Erro ao buscar time favorito:', error);
    timeFavorito.value = null;
    showCard.value = false;
  }
}

// Lifecycle
onMounted(async () => {
  await fetchFavoriteTeam();
});
</script>

<style scoped>
.favorite-card {
  border-radius: 16px;
  margin: 16px 16px;
  box-shadow: 0 4px 12px rgba(87, 6, 186, 0.1);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ion-color-dark);
  margin-bottom: 12px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.team-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.team-logo {
  width: 80px;
  height: 80px;
  border: 2px solid var(--ion-color-light-shade);
}

.team-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ion-color-dark);
  margin: 0;
  text-align: center;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--ion-color-light-tint);
  border-radius: 12px;
}

.info-item ion-icon {
  font-size: 20px;
  color: var(--ion-color-primary);
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 0.85rem;
  color: var(--ion-color-medium);
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ion-color-dark);
}

.match-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.match-date {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ion-color-dark);
}

.match-time {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ion-color-primary);
}

@media (min-width: 768px) {
  .card-content {
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
  
  .team-section {
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .favorite-card {
    margin: 12px;
  }
  
  .team-logo {
    width: 64px;
    height: 64px;
  }
  
  .team-name {
    font-size: 1.1rem;
  }
  
  .info-item {
    padding: 10px;
    gap: 10px;
  }
  
  .info-item ion-icon {
    font-size: 18px;
  }
}
</style>