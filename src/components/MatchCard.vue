<template>
  <div 
    class="match-card"
    @click="$emit('matchClick', match)"
    :class="[statusClass, { 'compact': compact }]"
  >
    <div class="match-content">
      <div class="match-header" :class="statusClass">
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
            <span class="stat-value">{{ match.homeScore || 0 }}</span>
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
            <span class="stat-value">{{ match.awayScore || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="match-footer" v-if="showFooter">
        <div class="competition-info">
          <div class="competition-icon">
            <ion-icon :icon="trophyOutline"></ion-icon>
          </div>
          <div class="competition-details">
            <span class="competition-name">{{ match.season?.name || 'Brasileirão Feminino' }}</span>
            <span class="round-info" v-if="match.roundInfo?.round">Rodada {{ match.roundInfo.round }}</span>
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
  return [31, 60, 70].includes(props.match.status?.code) // 1º tempo, 2º tempo, intervalo
})

const statusClass = computed(() => {
  if (isFinished.value) return 'finished'
  if (isLive.value) return 'live'
  return 'scheduled'
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
    // Fallback para horário padrão se não houver timestamp
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
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(87, 6, 186, 0.1);
  margin: 16px 0;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid #F5F3FF;
  position: relative;
}

.match-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #5706BA, #8B5CF6);
  opacity: 0.8;
}

.match-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(87, 6, 186, 0.15);
  border-color: #EDE9FE;
}

.match-card.live-match::before {
  background: linear-gradient(90deg, #22C55E, #4ADE80);
}

.match-card.compact {
  margin: 12px 0;
}

.match-content {
  padding: 0;
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(90deg, #F5F3FF, #EDE9FE);
  border-bottom: 1px solid #EDE9FE;
}

.match-header.live {
  background: linear-gradient(90deg, #F0FDF4, #DCFCE7);
}

.match-header.finished {
  background: linear-gradient(90deg, #F8FAFC, #F1F5F9);
}

.match-status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.match-header:not(.finished) .match-status-badge {
  background: #5706BA;
  color: white;
  box-shadow: 0 2px 8px rgba(87, 6, 186, 0.3);
}

.match-header.finished .match-status-badge {
  background: #6B7280;
  color: white;
}

.match-header.live .match-status-badge {
  background: #22C55E;
  color: white;
  animation: pulse 2s infinite;
}

.share-button {
  background: rgba(87, 6, 186, 0.1);
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  color: #5706BA;
  transition: all 0.3s ease;
}

.share-button:hover {
  background: #5706BA;
  color: white;
  transform: scale(1.1);
}

.teams-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px;
  gap: 20px;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 12px;
  position: relative;
}

.home-team {
  align-items: flex-start;
}

.away-team {
  align-items: flex-end;
}

.team-flag {
  width: 70px;
  height: 45px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #EDE9FE;
  transition: all 0.3s ease;
}

.team:hover .team-flag {
  transform: scale(1.05);
  border-color: #5706BA;
  box-shadow: 0 6px 20px rgba(87, 6, 186, 0.2);
}

.flag-stripe {
  flex: 1;
  min-height: 4px;
  transition: all 0.3s ease;
}

.team-name {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1F2937;
}

.home-team .team-name {
  text-align: left;
}

.away-team .team-name {
  text-align: right;
}

.team-stats {
  margin-top: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 800;
  color: #5706BA;
  font-variant-numeric: tabular-nums;
}

.match-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 80px;
}

.score-divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.divider-line {
  width: 20px;
  height: 2px;
  background: linear-gradient(90deg, #5706BA, #8B5CF6);
  border-radius: 2px;
}

.divider-x {
  font-size: 16px;
  font-weight: 700;
  color: #5706BA;
  padding: 4px 8px;
  background: #F5F3FF;
  border-radius: 8px;
}

.match-time {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #F5F3FF;
  border-radius: 12px;
  color: #5706BA;
  font-size: 12px;
  font-weight: 600;
}

.time-icon {
  font-size: 14px;
}

.match-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #FAFAFA;
  border-top: 1px solid #F3F4F6;
}

.competition-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.competition-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #5706BA, #8B5CF6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.competition-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.competition-name {
  font-size: 13px;
  font-weight: 600;
  color: #5706BA;
}

.round-info {
  font-size: 11px;
  color: #6B7280;
}

.match-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: #F5F3FF;
  color: #5706BA;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #5706BA;
  color: white;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .team-flag {
    width: 60px;
    height: 40px;
  }
  
  .team-name {
    font-size: 13px;
    max-width: 90px;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .teams-container {
    padding: 20px;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .match-card {
    border-radius: 16px;
    margin: 12px 0;
  }
  
  .teams-container {
    padding: 16px;
    gap: 12px;
  }
  
  .team-flag {
    width: 50px;
    height: 35px;
  }
  
  .team-name {
    font-size: 12px;
    max-width: 80px;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .match-center {
    min-width: 60px;
  }
  
  .divider-line {
    width: 15px;
  }
  
  .divider-x {
    font-size: 14px;
    padding: 3px 6px;
  }
  
  .match-footer {
    padding: 12px 16px;
  }
  
  .competition-icon {
    width: 28px;
    height: 28px;
  }
  
  .competition-name {
    font-size: 12px;
  }
  
  .round-info {
    font-size: 10px;
  }
}

.compact .match-card {
  margin: 8px 0;
}

.compact .team-flag {
  width: 45px;
  height: 30px;
}

.compact .team-name {
  font-size: 11px;
  max-width: 70px;
}

.compact .teams-container {
  padding: 12px;
}

.compact .match-footer {
  display: none;
}

@media (prefers-color-scheme: dark) {
  .match-card {
    background: #1F2937;
    border-color: #374151;
  }
  
  .match-card::before {
    opacity: 0.6;
  }
  
  .match-header {
    background: linear-gradient(90deg, #374151, #4B5563);
    border-color: #4B5563;
  }
  
  .team-name {
    color: #F9FAFB;
  }
  
  .match-footer {
    background: #111827;
    border-color: #374151;
  }
  
  .action-btn {
    background: #374151;
    color: #8B5CF6;
  }
}

@keyframes pulse {
  0% { 
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(34, 197, 94, 0.5);
  }
  100% { 
    transform: scale(1);
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  }
}

.match-header.live .match-status-badge {
  animation: pulse 2s ease-in-out infinite;
}

.team-flag,
.share-button,
.action-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>