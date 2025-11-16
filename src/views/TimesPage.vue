<template>
  <div v-if="loading" class="loading">
    <Text 
      content="Carregando times..." 
      element="span" 
      size="sm" 
      weight="regular" 
      color="dark"
    />
  </div>

  <div v-else-if="error" class="error">
    <Text 
      content="Erro ao carregar times." 
      element="span" 
      size="sm" 
      weight="regular" 
      color="dark"
    />
    <button @click="handleRetry" class="retry-button">
      Tentar novamente
    </button>
  </div>

  <div v-else>
    <TeamCard 
      v-for="team in teams" 
      :key="team.id" 
      :team="team"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TeamCard from '@/team/index.component.vue'
import { useTeamManagement } from '../team/composable/useTeamManagement'
import Text from '@/components/text/index.component.vue'

const {
  teams,    
  loading,
  error,
  clearError,
  fetchAllTeams
} = useTeamManagement()

const handleRetry = () => {
  clearError();
  fetchAllTeams();
};

onMounted(() => {
  fetchAllTeams()
})
</script>

<style scoped>
.loading, .error {
  text-align: center;
  padding: 40px;
  color: var(--ion-color-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.retry-button {
  background: none;
  border: none;
  color: var(--ion-color-primary);
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

.retry-button:hover {
  opacity: 0.7;
}
</style>