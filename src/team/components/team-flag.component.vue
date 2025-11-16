<template>
  <div class="team-flag" :class="sizeClass">
    <div 
      v-for="(color, index) in flagColors" 
      :key="index"
      class="flag-stripe"
      :style="{ backgroundColor: color }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TeamColors } from '../types';

interface Props {
  colors: TeamColors
  size?: 'sm' | 'md' | 'lg' | 'xs'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const flagColors = computed(() => {
  const colors = props.colors
  return [
    colors?.primary || '#5706BA',
    colors?.secondary || '#7E3EFF',
  ].filter(Boolean).slice(0, 2)
})

const sizeClass = computed(() => `flag-${props.size}`)
</script>

<style scoped>
.team-flag {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(71, 2, 2, 0.178);
}

.flag-stripe {
  flex: 1;
}

.flag-sm {
  width: 32px;
  height: 24px;
}

.flag-md {
  width: 48px;
  height: 32px;
}

.flag-lg {
  width: 64px;
  height: 40px;
}
</style>