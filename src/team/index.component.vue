<template>
    <TeamCard>
        <div class="card-content">
            <TeamFlag
                :team-name="props.team.name"
                :colors="props.team.teamColors"
            />
            <div class="team-info">
                <div class="team-name">
                    <Text 
                        :content="props.team.name" 
                        element="p" 
                        size="md" 
                        weight="regular" 
                        color="dark"
                    />
                    <Text 
                        :content="props.team.nameCode" 
                        element="p" 
                        size="md" 
                        weight="regular" 
                        color="medium"
                    />
                </div>
            </div>
            <div class="icon-button">
                <ion-button 
                    fill="clear" 
                    class="favorite-button"
                    :class="{ 'favorited': isFavorite }"
                    @click="handleFavoriteClick"
                >
                    <ion-icon 
                        :icon="isFavorite ? heart : heartOutline" 
                        slot="icon-only"
                    />
                </ion-button>
            </div>
        </div>
    </TeamCard>
</template>

<script setup lang="ts">
import { 
    IonButton, 
    IonIcon 
} from '@ionic/vue'
import { heart, heartOutline } from 'ionicons/icons'
import TeamCard from '@/components/card/index.component.vue'
import Text from '@/components/text/index.component.vue'
import { TeamProps } from './types'
import TeamFlag from './components/team-flag.component.vue'
import { useTeamCard } from './composable/useTeamCard'

const props = defineProps<TeamProps>();

const { isFavorite, handleFavoriteClick } = useTeamCard({
  team: props.team
})
</script>

<style scoped>
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.team-info {
  flex: 1;
  min-width: 0;
}

.team-name {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.favorite-button {
  --color: var(--ion-color-medium);
  --border-radius: 50%;
  margin: 0;
}

.favorite-button.favorited {
  --color: var(--ion-color-danger);
}
</style>