<!-- components/Text.vue -->
<template>
  <ion-text :color="color" :class="computedClasses">
    <component :is="element" v-if="!$slots.default">
      {{ content }}
    </component>
    <slot v-else></slot>
  </ion-text>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue'
import { computed } from 'vue'

interface Props {
  content?: string
  element?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
  italic?: boolean
  underline?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  element: 'p',
  size: 'md',
  weight: 'regular',
  align: 'left',
  color: 'dark',
  transform: 'none'
})

const computedClasses = computed(() => [
  `text-${props.size}`,
  `font-weight-${props.weight}`,
  `text-align-${props.align}`,
  `text-transform-${props.transform}`,
  {
    'text-italic': props.italic,
    'text-underline': props.underline
  },
  props.customClass
])
</script>

<style scoped>
.text-xs {
  font-size: var(--ion-font-size-xs);
  line-height: var(--ion-line-height-tight);
}

.text-sm {
  font-size: var(--ion-font-size-sm);
  line-height: var(--ion-line-height-normal);
}

.text-md {
  font-size: var(--ion-font-size-md);
  line-height: var(--ion-line-height-normal);
}

.text-lg {
  font-size: var(--ion-font-size-lg);
  line-height: var(--ion-line-height-normal);
}

.text-xl {
  font-size: var(--ion-font-size-xl);
  line-height: var(--ion-line-height-normal);
}

.text-xxl {
  font-size: var(--ion-font-size-xxl);
  line-height: var(--ion-line-height-tight);
}

.font-weight-light {
  font-weight: var(--ion-font-weight-light);
}

.font-weight-regular {
  font-weight: var(--ion-font-weight-regular);
}

.font-weight-medium {
  font-weight: var(--ion-font-weight-medium);
}

.font-weight-semibold {
  font-weight: var(--ion-font-weight-semibold);
}

.font-weight-bold {
  font-weight: var(--ion-font-weight-bold);
}

.text-align-left {
  text-align: left;
}

.text-align-center {
  text-align: center;
}

.text-align-right {
  text-align: right;
}

.text-align-justify {
  text-align: justify;
}

.text-transform-uppercase {
  text-transform: uppercase;
}

.text-transform-lowercase {
  text-transform: lowercase;
}

.text-transform-capitalize {
  text-transform: capitalize;
}

.text-transform-none {
  text-transform: none;
}

.text-italic {
  font-style: italic;
}

.text-underline {
  text-decoration: underline;
}

ion-text {
  display: block;
}

ion-text h1,
ion-text h2,
ion-text h3,
ion-text h4,
ion-text h5,
ion-text h6,
ion-text p {
  margin: 0;
  padding: 0;
}
</style>