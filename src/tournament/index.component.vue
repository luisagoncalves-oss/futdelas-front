<template>
    <Card title="Brasileirão Feminino A1">
        <ion-card-content>
            <div class="season-content ion-text-center">
                <Image src="../../public/assets/images/br_feminino.png" alt="Logo do Brasileirão Feminino"></Image>
                
                <Text 
                    :content="seasonText" 
                    element="p" 
                    size="md" 
                    weight="regular" 
                    color="dark" 
                    align="center" 
                    custom-class="ion-margin-vertical"
                />
                
                
                <TournamentStatus :isActive="props.isActive"/>
                
                <TitleHolder :team="props.titleHolder" />
            </div>
        </ion-card-content>
    </Card>
</template>

<script setup lang="ts">
import { IonCardContent } from '@ionic/vue'
import TitleHolder from './components/title-holder.component.vue'
import TournamentStatus from './components/tournament-status.component.vue'
import Text from '@/components/text/index.component.vue'
import { TournamentProps } from './types'
import Image from '@/components/image/index.component.vue'
import { ref } from 'vue'
import Card from '@/components/card/index.component.vue'

const props = defineProps<TournamentProps>();
const seasonText = ref('Temporada ' + props.season)
</script>

<style scoped>
.season-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>