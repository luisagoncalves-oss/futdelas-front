<template>
  <Card title="Classificação">
    <div class="card-content">
      <StandingsTable :standings="props.data" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '../components/card/index.component.vue'
import StandingsTable from './components/table/index.component.vue'
import { StandingsProps } from './types'

const props = defineProps<StandingsProps>();

</script>
