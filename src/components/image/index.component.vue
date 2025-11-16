<template>
    <ion-avatar>
        <ion-img 
        :src="src" 
        :alt="alt"
        />
    </ion-avatar>
</template>

<script setup lang="ts">
import { IonAvatar, IonImg } from '@ionic/vue'
import { LogoProps } from './types';

defineProps<LogoProps>()
</script>