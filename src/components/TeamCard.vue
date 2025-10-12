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
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

.team-flag-top .flag-stripe {
  flex: 1;
  min-height: 6px;
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
  width: 50px;
  height: 35px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #EDE9FE;
  flex-shrink: 0;
}

.flag-stripe-vertical {
  flex: 1;
  min-height: 4px;
}

.team-details {
  min-width: 0;
  flex: 1;
}

.team-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team-code {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

.favorite-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.favorite-btn:hover {
  background: #E5E7EB;
}

.favorite-btn:active {
  transform: scale(0.9);
}

.favorite-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.favorite-icon {
  font-size: 20px;
  color: #9CA3AF;
  transition: all 0.2s ease;
}

.favorite-icon.favorited {
  color: #EF4444;
  animation: heartBeat 0.3s ease-in-out;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  color: #5706BA;
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
    height: 30px;
  }
  
  .team-name {
    font-size: 14px;
  }
  
  .favorite-btn {
    width: 40px;
    height: 40px;
  }
  
  .favorite-icon {
    font-size: 18px;
  }
}
</style>