<template>
  <ion-page>
    <ion-header class="futdelas-header">
      <ion-toolbar>
        <div class="header-content">
          <div class="logo-container">
            <h1 class="app-name">Futdelas</h1>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-segment value="detalhes" @ionChange="mudarTela($event)" class="tab-segment">
      <ion-segment-button value="detalhes" class="segment-button">
        <ion-label>Detalhes</ion-label>
      </ion-segment-button>
      <ion-segment-button value="partidas" class="segment-button">
        <ion-label>Partidas</ion-label>
      </ion-segment-button>
      <ion-segment-button value="times" class="segment-button">
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
  margin: 24px 0 0 0;
  box-shadow: none;
  --background: linear-gradient(135deg, #ffffff 0%, #faf9ff 100%);
  --border-width: 0;
  border-bottom: 1px solid rgba(106, 11, 223, 0.08);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 72px;
  position: relative;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 14px;
}


.app-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  --color: #00000;
}

/* Segment Button Minimalista */
.tab-segment {
  --background: transparent;
  border-bottom: 1px solid rgba(106, 11, 223, 0.08);
}

.segment-button {
  --background: transparent;
  --background-checked: transparent;
  --color: #6c757d;
  --color-checked: #6a0bdf;
  --border-radius: 0;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  margin: 0;
  border: none;
  position: relative;
  font-weight: 500;
  transition: all 0.2s ease;
}

.segment-button::part(native) {
  border-radius: 0;
  background: transparent !important;
}

.segment-button:hover {
  --color: #2d1b69;
  background: rgba(106, 11, 223, 0.04);
}

.segment-button.segment-button-checked {
  --color: #6a0bdf;
  font-weight: 600;
}

.segment-button.segment-button-checked::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 3px;
  background: linear-gradient(135deg, #6a0bdf 0%, #8e44ad 100%);
  border-radius: 2px 2px 0 0;
}

.segment-button ion-label {
  font-size: 0.9rem;
  letter-spacing: 0.2px;
}

/* Responsividade para mobile */
@media (max-width: 768px) {
  .header-content {
    height: 64px;
    padding: 0 12px;
  }

  .logo-container {
    gap: 12px;
  }

  .logo-icon {
    width: 42px;
    height: 42px;
    font-size: 22px;
  }

  .app-name {
    font-size: 1.3rem;
  }

  .tab-segment {
    padding: 0 12px;
  }

  .segment-button ion-label {
    font-size: 0.85rem;
  }

  .segment-button.segment-button-checked::after {
    left: 8px;
    right: 8px;
    height: 2.5px;
  }
}

@media (max-width: 480px) {
  .header-content {
    height: 60px;
    padding: 0 8px;
  }

  .logo-container {
    gap: 10px;
  }

  .logo-icon {
    width: 38px;
    height: 38px;
    font-size: 20px;
  }

  .app-name {
    font-size: 1.2rem;
  }

  .tab-segment {
    padding: 0 8px;
    min-height: 40px;
  }

  .segment-button {
    --padding-start: 4px;
    --padding-end: 4px;
    --padding-top: 8px;
    --padding-bottom: 8px;
    min-height: 36px;
  }

  .segment-button ion-label {
    font-size: 0.8rem;
  }

  .segment-button.segment-button-checked::after {
    left: 6px;
    right: 6px;
    height: 2px;
  }
}

@media (max-width: 360px) {
  .app-name {
    font-size: 1.1rem;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  .segment-button {
    --padding-start: 3px;
    --padding-end: 3px;
    min-height: 34px;
  }

  .segment-button ion-label {
    font-size: 0.75rem;
  }
}

/* Melhorias de acessibilidade */
.segment-button:focus {
  outline: 2px solid rgba(106, 11, 223, 0.3);
  outline-offset: -2px;
}

.logo-container:focus {
  outline: 2px solid rgba(106, 11, 223, 0.5);
  outline-offset: 4px;
  border-radius: 24px;
}
</style>