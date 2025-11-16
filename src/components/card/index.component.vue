<template>
  <ion-card class="custom-card">
    <ion-card-header v-if="title">
      <ion-card-title>
        {{ title }}
      </ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <slot></slot>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent 
} from '@ionic/vue'
import { CardProps } from './types';

defineProps<CardProps>()
</script>

<style scoped>
.custom-card {
  border-radius: 8px;
  border: 1px solid #00000014;
  box-shadow: none;
}
</style>