<template>
  <div v-if="loading && !lastMatches" class="loading">
    <Text 
      content="Carregando partidas..." 
      element="span" 
      size="sm" 
      weight="regular" 
      color="dark"
    />
  </div>

  <div v-else-if="error" class="error">
    <Text 
      content="Erro ao carregar partidas." 
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
    <MatchCard 
      v-for="match in lastMatches?.events || []" 
      :key="match.id" 
      :match="match"
    />

    <div v-if="lastMatches && lastMatches.events.length > 0" class="pagination">
      <ion-button 
        @click="goToPreviousPage"
        :disabled="currentPage === 0 || loading"
        fill="clear"
        size="small"
      >
        <ion-icon :icon="chevronBack" slot="icon-only" />
      </ion-button>

      <Text 
        :content="'Página ' + (currentPage + 1)" 
        element="span" 
        size="sm" 
        weight="regular" 
        color="dark"
      />

      <ion-button 
        @click="goToNextPage"
        :disabled="!lastMatches.hasNextPage || loading"
        fill="clear"
        size="small"
      >
        <ion-icon :icon="chevronForward" slot="icon-only" />
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, chevronForward } from 'ionicons/icons';
import MatchCard from '@/match/index.component.vue';
import { useMatch } from '@/match/composables/useMatch';
import Text from '@/components/text/index.component.vue';

const {
  lastMatches,
  loading,
  error,
  currentPage,
  fetchLastMatches,
  clearError
} = useMatch();

const goToNextPage = () => {
  if (lastMatches.value?.hasNextPage) {
    fetchLastMatches(currentPage.value + 1);
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 0) {
    fetchLastMatches(currentPage.value - 1);
  }
};

const handleRetry = () => {
  clearError();
  fetchLastMatches(0);
};

onMounted(() => {
  fetchLastMatches(0);
});
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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 24px 0;
  padding: 0 16px;
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