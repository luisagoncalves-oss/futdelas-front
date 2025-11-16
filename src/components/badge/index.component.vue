<template>
  <ion-badge 
    :color="color" 
    :mode="mode"
  >
    {{ label }}
  </ion-badge>
</template>

<script setup lang="ts">
import { IonBadge } from '@ionic/vue'
import { BadgeProps } from './types';

defineProps<BadgeProps>();
</script>