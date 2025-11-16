<template>
    <Badge :label="label" :color="color"/>
</template>
<script setup lang="ts">
import Badge from '@/components/badge/index.component.vue'
import { TournamentStatusProps } from './types';
import { onMounted, ref } from 'vue';
import { Color } from '@/types';
const props = defineProps<TournamentStatusProps>();

const label = ref('');
const color = ref<Color>(undefined)

const tournamentStatus = () => {
    if(props.isActive){
        label.value = "Em andamento"
        color.value = 'primary'
    } else {
        label.value = "Finalizada"
        color.value = 'success'
    }
}

onMounted(() => {
    tournamentStatus();
})
</script>