<template>
  <ion-page>
    <ion-header class="futdelas-header">
      <ion-toolbar>
        <div class="header-content">
          <div class="logo-container">
            <div class="logo-icon">
              <div>⚽</div>
            </div>
            <h1 class="app-name text-xl font-weight-semibold">Futdelas</h1>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-segment value="detalhes" @ionChange="mudarTela($event)" class="tab-segment">
      <ion-segment-button value="detalhes">
        <ion-label>Detalhes</ion-label>
      </ion-segment-button>
      <ion-segment-button value="partidas">
        <ion-label>Partidas</ion-label>
      </ion-segment-button>
      <ion-segment-button value="times">
        <ion-label>Times</ion-label>
      </ion-segment-button>
    </ion-segment>

    <ion-content>
      <div v-if="telaAtiva === 'detalhes'">
        <DetalhesPage />
      </div>
      <div v-if="telaAtiva === 'partidas'">
        <PartidasPage />
      </div>
      <div v-if="telaAtiva === 'times'">
        <TimesPage />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar
} from '@ionic/vue';
import DetalhesPage from '@/views/DetalhesPage.vue';
import PartidasPage from '@/views/PartidasPage.vue';
import TimesPage from '@/views/TimesPage.vue';

const telaAtiva = ref('detalhes');

const mudarTela = (ev: CustomEvent) => {
  telaAtiva.value = ev.detail.value;
};
</script>

<style scoped>
.futdelas-header {
  box-shadow: none !important;
  --background: #fff;
  --border-color: #e0e0e0;
}

.header-content {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 64px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
}

.app-name {
  margin: 0;
  letter-spacing: var(--ion-letter-spacing-tight);
}

/* Responsividade */
@media (max-width: 480px) {
  .header-content {
    height: 56px;
    padding: 0 12px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  .app-name {
    font-size: var(--ion-font-size-lg);
  }
}
</style>