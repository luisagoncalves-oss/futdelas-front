<template>
  <div 
    class="match-card"
    @click="$emit('matchClick', match)"
    :class="[statusClass, { 'compact': compact }]"
  >
    <div class="match-content">
      <div class="match-header">
        <div class="match-status-badge">
          {{ statusText }}
        </div>
        <button 
          class="share-button"
          @click.stop="$emit('shareMatch', match.id)"
          aria-label="Compartilhar partida"
        >
          <ion-icon :icon="shareOutline" class="share-icon"></ion-icon>
        </button>
      </div>

      <div class="teams-container">
        <div class="team home-team">
          <div class="team-flag">
            <div 
              v-for="(color, index) in homeTeamColors" 
              :key="index"
              class="flag-stripe"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
          <span class="team-name">{{ match.homeTeam?.name }}</span>
          <div class="team-stats" v-if="showScore">
            <span class="stat-value">{{ match.homeScore.current || 0 }}</span>
          </div>
        </div>

        <div class="match-center">
          <div class="score-divider">
            <span class="divider-line"></span>
            <span class="divider-x">X</span>
            <span class="divider-line"></span>
          </div>
          <div class="match-time" v-if="!isFinished">
            <ion-icon :icon="timeOutline" class="time-icon"></ion-icon>
            <span>{{ formatMatchTime() }}</span>
          </div>
        </div>

        <div class="team away-team">
          <div class="team-flag">
            <div 
              v-for="(color, index) in awayTeamColors" 
              :key="index"
              class="flag-stripe"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
          <span class="team-name">{{ match.awayTeam?.name }}</span>
          <div class="team-stats" v-if="showScore">
            <span class="stat-value">{{ match.awayScore.current || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  IonIcon
} from '@ionic/vue'
import { 
  shareOutline, 
  trophyOutline, 
  timeOutline 
} from 'ionicons/icons'

const props = defineProps({
  match: {
    type: Object,
    required: true,
    default: () => ({})
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['matchClick', 'shareMatch'])

const homeTeamColors = computed(() => {
  const colors = props.match.homeTeam?.teamColors || {}
  return [
    colors.primary || '#5706BA',
    colors.secondary || colors.primary || '#7E3EFF',
    colors.tertiary || colors.secondary || colors.primary || '#A375FF'
  ].slice(0, 3)
})

const awayTeamColors = computed(() => {
  const colors = props.match.awayTeam?.teamColors || {}
  return [
    colors.primary || '#06BAC9',
    colors.secondary || colors.primary || '#3ED1DE',
    colors.tertiary || colors.secondary || colors.primary || '#75E0EA'
  ].slice(0, 3)
})

const isFinished = computed(() => {
  return props.match.status?.code === 100 || props.match.status?.type === 'finished'
})

const isLive = computed(() => {
  return [31, 60, 70].includes(props.match.status?.code)
})

const statusText = computed(() => {
  const status = props.match.status
  if (!status) return 'AGENDADA'
  
  if (status.code === 100) return 'FINALIZADA'
  if (status.code === 0) return 'AGENDADA'
  if ([31, 60].includes(status.code)) return 'AO VIVO'
  if (status.code === 70) return 'INTERVALO'
  
  return status.description?.toUpperCase() || 'AGENDADA'
})

const showScore = computed(() => {
  return isFinished.value || isLive.value
})

const formatMatchTime = () => {
  if (!props.match?.startTimestamp) {
    return '19:00'
  }
  const date = new Date(props.match.startTimestamp * 1000)
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
.match-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 12px 0;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(106, 11, 223, 0.1);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f9;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.match-status-badge {
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  background: #27ae60;
}

.share-button {
  border: none;
  background: transparent;
  color: #6A0BDF;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.share-button:hover {
  color: #4e09b2;
}

.teams-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 12px;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.team-flag {
  width: 56px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.flag-stripe {
  flex: 1;
}

.team-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f1f1f;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #6A0BDF;
}

.match-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 70px;
}

.divider-x {
  font-size: 1rem;
  font-weight: 700;
  color: #6A0BDF;
}

.match-time {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 10px;
  background: #f3f3f5;
  color: #6A0BDF;
  font-size: 0.8rem;
  font-weight: 600;
}

.match-footer {
  background: #fafafa;
  padding: 12px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.competition-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.competition-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #6A0BDF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.competition-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6A0BDF;
}

.round-info {
  font-size: 0.75rem;
  color: #777;
}

@media (max-width: 480px) {
  .teams-container {
    padding: 12px;
  }
  .team-flag {
    width: 48px;
    height: 30px;
  }
  .team-name {
    font-size: 0.8rem;
  }
  .stat-value {
    font-size: 0.9rem;
  }
}
</style>
