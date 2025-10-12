<!-- TeamLogo.vue -->
<template>
  <div class="team-logo-container">
    <img 
      v-if="!loading && logoUrl"
      :src="logoUrl" 
      :alt="`Logo do time ${teamId}`"
      class="team-logo"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    
    <div v-else-if="loading" class="logo-skeleton">
      Carregando...
    </div>
    
    <div v-else class="logo-error">
      Erro ao carregar
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiClient } from '@/api/config/futedelas.api.client';
import { ref, onMounted, watch, onUnmounted } from 'vue';

interface Props {
  teamId: number | string;
}

const props = defineProps<Props>();

const logoUrl = ref<string>('');
const loading = ref<boolean>(true);
const error = ref<boolean>(false);

const loadTeamLogo = async () => {
  try {
    loading.value = true;
    error.value = false;
    
    if (logoUrl.value && logoUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(logoUrl.value);
      logoUrl.value = '';
    }
    const response = await apiClient.getBlob(`/teams/${props.teamId}/logo`);


    if (response.data) {
      logoUrl.value = URL.createObjectURL(response.data);
    } else {
      throw new Error('Blob vazio ou inválido recebido');
    }
    
  } catch (err) {
    error.value = true;
    logoUrl.value = '';
  } finally {
    loading.value = false;
  }
};

const handleImageError = () => {
  error.value = true;
  
  if (logoUrl.value && logoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(logoUrl.value);
  }
  
  logoUrl.value = '';
};

const handleImageLoad = () => {
  error.value = false;
};

onMounted(() => {
  loadTeamLogo();
});

watch(() => props.teamId, () => {
  loadTeamLogo();
});

onUnmounted(() => {
  if (logoUrl.value && logoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(logoUrl.value);
  }
});
</script>

<style scoped>
.team-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 4px;
}

.logo-skeleton {
  width: 48px;
  height: 48px;
  background-color: #f3f4f6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6b7280;
  animation: pulse 1.5s ease-in-out infinite;
}

.logo-error {
  width: 48px;
  height: 48px;
  background-color: #fee2e2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #ef4444;
  border: 1px dashed #ef4444;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>