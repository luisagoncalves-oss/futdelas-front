<template>
  <Card>
    <div class="card-content">
      <ion-grid class="ion-no-padding">
        <ion-row class="ion-align-items-center champion-row">
          <ion-col size="auto">
            <Image src="../../../public/assets/images/corinthians.png" alt="Logo do Corinthians"></Image>
          </ion-col>
          <ion-col>
            <Text 
                content="Corinthians" 
                element="strong" 
                size="sm"  
                color="dark" 
                align="left" 
            />
            <Text 
                content="Atual campeão" 
                element="p" 
                size="sm"  
                color="medium" 
                align="left" 
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { 
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue'
import Text from '@/components/text/index.component.vue';
import { TitleHolderProps } from './types';
import Image from '@/components/image/index.component.vue';
import Card from '@/components/card/index.component.vue'

const props = defineProps<TitleHolderProps>()
</script>

<style scoped>
.champion-row {
  gap: 12px;
}
</style>