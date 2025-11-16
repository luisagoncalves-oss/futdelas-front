<template>
    <Card>
        <div class="match-container">
            <div class="badge-row">
                <Badge :label="label" :color="color"/>
                <Sharing @click="shareMatch" />
            </div>
            
            <div class="round-row">
              <Text 
                :content="'Rodada ' + props.match.roundInfo.round.toString()"
                element="strong"
                tag="p"
                size="sm"
              />
            </div>
            <div class="card-content">
                <div class="team home-team">
                    <TeamFlag
                        :team-name="props.match.homeTeam.name"
                        :colors="props.match.homeTeam.teamColors"
                        :size="'sm'"
                    />
                    <div class="team-info">
                        <Text 
                            :content="props.match.homeTeam.nameCode" 
                            element="span" 
                            size="sm" 
                            weight="regular" 
                            color="dark"
                            custom-class="team-name"
                        />
                        <Text 
                            :content="props.match.homeScore.current.toString()" 
                            element="strong" 
                            size="md" 
                            weight="bold" 
                            color="dark"
                            custom-class="score"
                        />
                    </div>
                </div>

                <Text 
                    content="X" 
                    element="span" 
                    size="sm" 
                    weight="bold" 
                    color="medium"
                    custom-class="vs"
                />

                <div class="team away-team">
                    <TeamFlag
                        :team-name="props.match.awayTeam.name"
                        :colors="props.match.awayTeam.teamColors"
                        :size="'sm'"
                    />
                    <div class="team-info">
                        <Text 
                            :content="props.match.awayTeam.nameCode" 
                            element="span" 
                            size="sm" 
                            weight="regular" 
                            color="dark"
                            custom-class="team-name"
                        />
                        <Text 
                            :content="props.match.awayScore.current.toString()" 
                            element="strong" 
                            size="md" 
                            weight="bold" 
                            color="dark"
                            custom-class="score"
                        />
                    </div>
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/card/index.component.vue'
import Text from '@/components/text/index.component.vue'
import TeamFlag from '../team/components/team-flag.component.vue'
import { MatchProps } from './types';
import Badge from  '@/components/badge/index.component.vue'
import Sharing from  '@/components/sharing/index.component.vue'
import { Color } from '@/types';
import { onMounted, ref } from 'vue';
import { Share } from '@capacitor/share';

const props = defineProps<MatchProps>();
const label = ref('');
const color = ref<Color>();

const matchStatus = () => {
  if (props.match.status.code === 100) {
    label.value = 'Finalizada'
    color.value = 'success'
  } else if (props.match.status.code === 0) {
    label.value = 'Não iniciada'
    color.value = 'primary'
  } else {
    label.value = 'Em progresso'
    color.value = 'danger'
  }
}

const shareMatch = async () => {
  try {
    const match = props.match;
    
    const matchDate = new Date(match.startTimestamp * 1000);
    const formattedDate = matchDate.toLocaleDateString('pt-BR');
    const formattedTime = matchDate.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    let statusMessage = '';
    let scoreMessage = '';

    if (match.status.code === 100) { 
      statusMessage = `🏁 Partida Finalizada\n`;
      scoreMessage = `📊 Placar: ${match.homeScore.current} x ${match.awayScore.current}`;
    } else if (match.status.code === 0) { 
      statusMessage = `⏰ Partida Agendada\n`;
      scoreMessage = `🕒 Horário: ${formattedTime}`;
    } else {
      statusMessage = `⚽ Partida em Andamento\n`;
      scoreMessage = `📊 Placar Atual: ${match.homeScore.current} x ${match.awayScore.current}`;
    }

    const shareText = `
${statusMessage}
🏆 ${match.season.name} ${match.season.year}
🔄 ${match.roundInfo ? `Rodada ${match.roundInfo.round}` : ''}

${match.homeTeam.name} 🆚 ${match.awayTeam.name}

${scoreMessage}
📅 Data: ${formattedDate}

Compartilhado via FutDelas ⚽
    `.trim();

    await Share.share({
      title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      text: shareText,
      url: `https://futdelas.com/match/${match.id}`,
      dialogTitle: 'Compartilhar Resultado da Partida'
    });

  } catch (error) {
    throw error;
  }
};

onMounted(() => {
  matchStatus();
});
</script>

<style scoped>
.match-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
}

.badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  padding: 0 8px;
  min-width: 0;
}

.team {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.home-team {
  justify-content: flex-start;
}

.away-team {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 0;
  flex: 1;
}

.round-row {
  display: flex;
  flex-direction: column;
  margin: 16px 0;
}

::v-deep(.team-name) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
  text-align: center;
  display: block;
}

::v-deep(.score) {
  font-size: 1.1rem;
  min-width: 20px;
  text-align: center;
}

::v-deep(.vs) {
  font-size: 0.9rem;
  min-width: 20px;
  text-align: center;
  flex-shrink: 0;
}
</style>