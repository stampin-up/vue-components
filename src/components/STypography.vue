<template>
  <VBtn
    v-bind="$attrs"
    :class="{
      'h1': h1,
      'h2': h2,
      'h3': h3,
      'h4': h4,
      'h5': h5,
      'h6': h6,
      'p': p,
      'link': isText,
    }"
    :text="isText"
    v-on="$listeners"
  >
    <slot />
  </VBtn>
</template>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

interface Props {
 h1?: boolean
 h2?: boolean
 h3?: boolean
 h4?: boolean
 h5?: boolean
 h6?: boolean
 p?: boolean
}

const props = withDefaults(defineProps<Props>(), {
})
const attrs = useAttrs()
const isText = computed(() => props.h1 || props.h2 || props.h3 || attrs.text)

</script>

<style lang="scss" scoped>
h1, .display-h1 {
  font-size: 4rem; /* 56px */
  font-weight: 300; // light
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
}

h2, .display-h2 {
  font-size: 2.857rem;
  font-weight: 400; // regular
  margin: 0;
  text-transform: uppercase;
  line-height: 1;
}

h3, h4, .display-h3 {
  font-size: 1.643rem;
  font-weight: 600; // semi-bold
  text-transform: uppercase;
  line-height: 1;
}

h5 {
  font-size: 1.429rem;
  font-weight: 700; // bold
  text-transform: uppercase;
  line-height: 1;
}

h6 {
  font-size: 1.286rem;
  font-weight: 400; // regular
  text-transform: uppercase;
  line-height: 1.1;
}

@media only screen and (min-width: 600px) and (max-width: 959px) {
  h1 { font-size: 3.429rem; }
  h2 { font-size: 2.286rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.714rem; }
  h5 { font-size: 1.286rem; }
  h6 { font-size: 1.143rem; }
}

@media only screen and (max-width: 599px) {
  h1 { font-size: 2.857rem; }
  h2 { font-size: 1.714rem; }
  h3 { font-size: 1.357rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.143rem; }
  h6 { font-size: 1rem; font-weight: 600;}
  p { font-size: 1rem; }
}

p {
  font-size: 1.143rem;
  line-height: 1.375rem;
}

a {
  color: #00b3a8 !important;
}

.details, .reward-details {
  font-size: .7857rem;
  text-transform: uppercase;
  color: var(--v-greyedOut-base);
}

.fine-print {
  font-size: .8571rem;
}

.footer-link {
  color: var(--v-primary-base)!important;
  font-size: 1rem;
  display: block;
  justify-content: start;
}

.footer-link--legal {
  color: var(--v-hover-base)!important;
  font-size: .8571rem;
  text-transform: uppercase;
}
</style>
