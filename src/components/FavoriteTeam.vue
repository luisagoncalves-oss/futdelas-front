<template>
  <div class="favorite-team-container">
    <ion-card class="favorite-team-card" v-if="timeFavorito">
      <ion-card-header>
        <ion-card-title class="card-title">Time favorito</ion-card-title>
      </ion-card-header>
      
      <ion-card-content>
        <div class="favorite-team-content">
          <div class="team-logo">
            <div 
              class="logo-placeholder"
              :style="{ 
                backgroundColor: timeFavorito.team?.teamColors?.primary || '#6a0bdf',
                color: timeFavorito.team?.teamColors?.text || '#ffffff'
              }"
            >
              {{ getTeamInitials(timeFavorito.team?.name) }}
            </div>
          </div>
          
          <div class="team-info">
            <h3 class="team-name">{{ timeFavorito.team?.name }}</h3>
            <p class="favorite-label">Seu time favorito</p>
          </div>
          
          <ion-button 
            fill="clear" 
            class="remove-button"
            @click="handleRemoveFavorite"
          >
            <ion-icon :icon="heartDislikeOutline" />
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>

    <ion-card class="no-favorite-card" v-else>
      <ion-card-content>
        <div class="no-favorite-content">
          <ion-icon :icon="heartOutline" class="empty-icon" />
          <h3>Nenhum time favorito</h3>
          <p>Escolha seu time do coração na aba "Times"</p>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton, 
  IonIcon 
} from '@ionic/vue';
import { heartOutline, heartDislikeOutline } from 'ionicons/icons';
import { ref, onMounted } from 'vue';
import { FavoriteTeam } from '@/api/types/favoriteTeam.type';

const timeFavorito = ref<FavoriteTeam | any>(null);
const userId = '12345';

// Função para obter iniciais do time
const getTeamInitials = (teamName?: string): string => {
  if (!teamName) return '??';
  return teamName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 3);
};

// Função mock para buscar time favorito
const fetchFavoriteTeam = async () => {
  try {
    // Busca do localStorage
    const favoriteFromStorage = localStorage.getItem(`favoriteTeam_${userId}`);
    
    if (favoriteFromStorage) {
      timeFavorito.value = JSON.parse(favoriteFromStorage);
    } else {
      timeFavorito.value = null;
    }
  } catch (error) {
    console.error('Erro ao buscar time favorito:', error);
    timeFavorito.value = null;
  }
};

const handleRemoveFavorite = async () => {
  try {
    // Remove do localStorage
    localStorage.removeItem(`favoriteTeam_${userId}`);
    timeFavorito.value = null;
    
    console.log('Time removido dos favoritos');
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
  }
};

onMounted(async () => {
  await fetchFavoriteTeam();
});
</script>

<style scoped>
.favorite-team-container {
  padding: 16px;
}

.favorite-team-card {
  border-radius: 20px;
  box-shadow: 
    0 4px 20px rgba(106, 11, 223, 0.12),
    0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(106, 11, 223, 0.08);
  background: linear-gradient(135deg, #ffffff 0%, #faf9ff 100%);
  transition: all 0.3s ease;
}

.favorite-team-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 30px rgba(106, 11, 223, 0.15),
    0 2px 6px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d1b69;
  margin-bottom: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(106, 11, 223, 0.1);
}

.favorite-team-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.team-logo {
  flex-shrink: 0;
}

.logo-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  border: 2px solid rgba(106, 11, 223, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.team-info {
  flex: 1;
  min-width: 0;
}

.team-name {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d1b69;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.favorite-label {
  margin: 0;
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.remove-button {
  --color: #eb445a;
  --background-hover: rgba(235, 68, 90, 0.1);
  margin: 0;
}

.remove-button:hover {
  transform: scale(1.1);
}

.no-favorite-card {
  border-radius: 20px;
  box-shadow: 
    0 4px 20px rgba(106, 11, 223, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);
  border: 2px dashed rgba(106, 11, 223, 0.2);
  background: linear-gradient(135deg, #f8f6ff 0%, #f0ebff 100%);
  text-align: center;
}

.no-favorite-content {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-icon {
  font-size: 3rem;
  color: rgba(106, 11, 223, 0.3);
  margin-bottom: 8px;
}

.no-favorite-content h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d1b69;
}

.no-favorite-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #6c757d;
  max-width: 250px;
  line-height: 1.4;
}

/* Responsividade */
@media (max-width: 768px) {
  .favorite-team-container {
    padding: 12px;
  }
  
  .favorite-team-content {
    gap: 12px;
  }
  
  .logo-placeholder {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }
  
  .team-name {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .favorite-team-container {
    padding: 8px;
  }
  
  .favorite-team-content {
    gap: 10px;
  }
  
  .logo-placeholder {
    width: 45px;
    height: 45px;
    font-size: 0.9rem;
  }
  
  .team-name {
    font-size: 0.95rem;
  }
  
  .no-favorite-content {
    padding: 20px 12px;
  }
  
  .empty-icon {
    font-size: 2.5rem;
  }
}
</style>