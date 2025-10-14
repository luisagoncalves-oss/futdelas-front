<template>
  <ion-card class="team-card" @click="$emit('teamClick', teamData)">
    <div class="team-flag-top">
      <div 
        v-for="(color, index) in teamFlagColors" 
        :key="index"
        class="flag-stripe"
        :style="{ backgroundColor: color }"
      ></div>
    </div>

    <div class="team-content">
      <div class="team-info">
        <div class="team-flag-vertical">
          <div 
            v-for="(color, index) in teamFlagColors" 
            :key="index"
            class="flag-stripe-vertical"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
        
        <div class="team-details">
          <h3 class="team-name">{{ teamData.name }}</h3>
          <p class="team-code">{{ teamData.nameCode }}</p>
        </div>
      </div>

      <button 
        class="favorite-btn"
        @click.stop="handleToggleFavorite"
        :disabled="isLoading"
        :aria-label="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <ion-spinner 
          v-if="isLoading" 
          name="circular" 
          class="loading-spinner"
        />
        <ion-icon
          v-else
          :icon="isFavorite ? heart : heartOutline"
          :class="['favorite-icon', { 'favorited': isFavorite }]"
        />
      </button>
    </div>
  </ion-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  IonCard,
  IonIcon,
  IonSpinner
} from '@ionic/vue'
import { 
  heart, 
  heartOutline
} from 'ionicons/icons'

const props = defineProps({
  teamData: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Time',
      nameCode: 'TME',
      teamColors: {
        primary: '#5706BA',
        secondary: '#ffffff',
        text: '#ffffff'
      }
    })
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['saveFavorite', 'deleteFavorite', 'teamClick'])

const isLoading = ref(false)

const teamFlagColors = computed(() => {
  const colors = props.teamData.teamColors
  return [
    colors.primary || '#5706BA',
    colors.secondary || '#7E3EFF',
    colors.text || '#ffffff'
  ].slice(0, 3)
})

const handleToggleFavorite = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    
    if (props.isFavorite) {
      await emit('deleteFavorite', props.teamData.teamId || props.teamData.id)
    } else {
      await emit('saveFavorite', props.teamData.teamId || props.teamData.id)
    }
  } catch (error) {
    console.error('Erro ao alterar favorito:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.team-card {
  border-radius: 16px;
  margin: 8px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.team-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(106, 11, 223, 0.08);
}

.team-card:active {
  transform: scale(0.98);
}

.team-flag-top {
  height: 6px;
  display: flex;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.flag-stripe {
  flex: 1;
}

.team-content {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.team-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.team-flag-vertical {
  width: 48px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.flag-stripe-vertical {
  flex: 1;
}

.team-details {
  flex: 1;
  min-width: 0;
}

.team-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f1f1f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team-code {
  margin: 4px 0 0;
  font-size: 0.8rem;
  color: #777;
  font-weight: 500;
}

.favorite-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.favorite-btn:hover {
  background: rgba(106, 11, 223, 0.08);
}

.favorite-btn:active {
  transform: scale(0.92);
}

.favorite-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.favorite-icon {
  font-size: 1.2rem;
  color: #a0a0a0;
  transition: color 0.2s ease;
}

.favorite-icon.favorited {
  color: #ef4444;
  animation: heartBeat 0.3s ease-in-out;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  color: #6A0BDF;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@media (max-width: 480px) {
  .team-content {
    padding: 12px;
  }
  .team-flag-vertical {
    width: 40px;
    height: 28px;
  }
  .team-name {
    font-size: 0.9rem;
  }
  .favorite-btn {
    width: 38px;
    height: 38px;
  }
}
</style>
