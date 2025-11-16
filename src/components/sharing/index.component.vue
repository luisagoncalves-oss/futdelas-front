<template>
    <ion-button
      class="share-button"
      fill="clear"
      size="small"
      @click="handleClick"
    >
      <ion-icon :icon="shareOutline" slot="icon-only" />
    </ion-button>
</template>

<script setup lang="ts">
import { 
  IonButton,
  IonIcon,
} from '@ionic/vue';
import { shareOutline } from 'ionicons/icons';

const emit = defineEmits<{
  click: []
}>();

const handleClick = () => {
  emit('click');
};
</script>