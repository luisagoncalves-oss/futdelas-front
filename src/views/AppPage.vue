<template>
  <ion-page>
    <ion-header class="futdelas-header">
      <ion-toolbar>
        <div class="header-content">
          <div class="logo-container">
            <h1 class="app-name">FutDelas</h1>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-segment :value="activeScreen" @ionChange="changeScreen($event)" class="tab-segment">
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

    <ion-content 
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      class="swipe-content"
    >
      <DetalhesPage v-if="activeScreen === 'detalhes'" />
      <PartidasPage v-if="activeScreen === 'partidas'" />
      <TimesPage v-if="activeScreen === 'times'" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

const route = useRoute();
const router = useRouter();

// Screens disponíveis
const screens = ['detalhes', 'partidas', 'times'];

// Tab ativa baseada no parâmetro da rota
const activeScreen = computed(() => {
  const routeTab = route.params.tab as string;
  return screens.includes(routeTab) ? routeTab : 'detalhes';
});

// Índice atual para o swipe
const currentIndex = computed(() => screens.indexOf(activeScreen.value));

// Variáveis para controle do swipe
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchEndX = ref(0);

const changeScreen = (ev: CustomEvent) => {
  const newScreen = ev.detail.value;
  // Navega para a nova tela, atualizando a URL
  router.push(`/app/${newScreen}`);
};

const onTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX;
  touchStartY.value = event.touches[0].clientY;
};

const onTouchEnd = (event: TouchEvent) => {
  touchEndX.value = event.changedTouches[0].clientX;
  
  const diffX = touchStartX.value - touchEndX.value;
  const diffY = Math.abs(touchStartY.value - event.changedTouches[0].clientY);
  
  const minSwipeDistance = 60;
  const maxVerticalTolerance = 30; 
  
  if (Math.abs(diffX) > minSwipeDistance && diffY < maxVerticalTolerance) {
    handleSwipe(diffX);
  }
};

const handleSwipe = (diffX: number) => {
  // Swipe para a esquerda (próxima tela)
  if (diffX > 0 && currentIndex.value < screens.length - 1) {
    const nextScreen = screens[currentIndex.value + 1];
    router.push(`/app/${nextScreen}`);
  }
  // Swipe para a direita (tela anterior)
  else if (diffX < 0 && currentIndex.value > 0) {
    const prevScreen = screens[currentIndex.value - 1];
    router.push(`/app/${prevScreen}`);
  }
};

// Garante que a URL sempre reflita a tela atual
watch(activeScreen, (newScreen) => {
  if (newScreen && route.params.tab !== newScreen) {
    router.replace(`/app/${newScreen}`);
  }
});
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
  color: #000000;
}

.tab-segment {
  --background: transparent;
  border-bottom: 1px solid rgba(106, 11, 223, 0.08);
}

.segment-button {
  --background: transparent;
  --background-checked: transparent;
  --color: #6c757d;
  --color-checked: #542583;
  --border-radius: 0;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  margin: 0;
  position: relative;
  font-weight: 500;
}

.segment-button::part(native) {
  border-radius: 0;
  background: transparent;
}

.segment-button.segment-button-checked {
  --color: #542583;
  font-weight: 600;
}

.segment-button.segment-button-checked::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 3px;
  background: #542583;
  border-radius: 2px 2px 0 0;
}

.segment-button ion-label {
  font-size: 0.9rem;
  letter-spacing: 0.2px;
}

@media (max-width: 768px) {
  .header-content {
    height: 64px;
    padding: 0 12px;
  }

  .logo-container {
    gap: 12px;
  }

  .app-name {
    font-size: 1.3rem;
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

  .app-name {
    font-size: 1.2rem;
  }

  .segment-button {
    --padding-start: 4px;
    --padding-end: 4px;
    --padding-top: 8px;
    --padding-bottom: 8px;
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
</style>