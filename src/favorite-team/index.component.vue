<template>
    <Card title="Time favorito" v-if="props.team">
      <div class="favorite-team-content">
        <TeamFlag 
          :colors="props.team.teamColors"
          shape="rounded"
        />
        
        <div class="team-info">
          <div class="name-row">
            <Text 
              :content="props.team.name"
              size="lg"
              weight="semibold"
              color="dark"
              custom-class="team-name"
            />
            <Text 
              :content="props.team.pregameForm.position + 'º colocado'"
              size="sm"
              color="dark"
              weight="bold"
              custom-class="team-position"
            />
          </div>

          <Text 
            :content="props.team.nameCode"
            size="sm"
            weight="medium"
            color="medium"
            custom-class="team-code"
          />
        </div>
      </div>
    </Card>

    <Card title="Time favorito" v-else>
      <div class="card-container">
        <div class="card-content">
          <Text 
            content="Nenhum time selecionado."
            size="md"
            weight="medium"
            color="dark"
            align="center"
          />
          <Text 
            content="Escolha seu time do coração na aba 'Times'."
            size="sm"
            color="medium"
            align="center"
          />
        </div>
      </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/card/index.component.vue';
import Text from '@/components/text/index.component.vue';
import { FavoriteTeamProps } from './types';
import TeamFlag from '../team/components/team-flag.component.vue';

const props = defineProps<FavoriteTeamProps>();
</script>

<style scoped>
.favorite-team-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}

.team-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 16px;
}

:deep(.team-name) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

:deep(.team-code) {
  letter-spacing: 0.5px;
  opacity: 0.8;
}

:deep(.team-position) {
  flex-shrink: 0;
  white-space: nowrap;
}
</style>