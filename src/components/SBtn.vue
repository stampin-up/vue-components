<template>
  <VBtn
    v-bind="$attrs"
    :class="{
      'action-button': action,
      'link--small': linkSmall,
      'link--medium': linkMedium,
      'link--large': linkLarge,
      'link--simple': linkSimple,
      'rounded': rounded,
      'link': isCustomLink,
    }"
    :text="isText"
    :nuxt="isLink"
    :to="to"
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
 action?: boolean
 linkSmall?: boolean
 linkMedium?: boolean
 linkLarge?: boolean
 linkSimple?: boolean
 rounded?: boolean
 to?: string | object
}

const props = withDefaults(defineProps<Props>(), {
  action: false,
  linkSmall: false,
  linkMedium: false,
  linkLarge: false,
  linkSimple: false,
  rounded: false,
  to: undefined
})
const attrs = useAttrs()
const isLink = computed(() => !!props.to)
const isCustomLink = computed(() => props.linkSmall || props.linkLarge || props.linkMedium )
const isUnderlinedLink = computed(() => isCustomLink.value || (!!attrs.text || attrs.text === '') )
const isText = computed(() => isUnderlinedLink.value || props.linkSimple)
</script>

<style lang="scss" scoped>
.action-button {
  font-weight : 700 !important;
  text-transform : uppercase !important;
  color: var(--v-primary-base);
  box-shadow: none;

  &.black-button {
    border-radius: 0 !important;
    background-color: var(--v-primary-base) !important;
    color: white !important;
  }
  &.translucent {
    background-color: white !important;
    color: var(--v-primary-base) !important;
    opacity: 0.75;
    &:hover {
      background-color: var(--v-hover-base) !important;
    }
  }
  &.small {
    height: 46px !important;
  }
  @media #{map-get($display-breakpoints, 'sm-and-up')} {
    &:hover { background-color: var(--v-hover-base) !important; }
  }
  &.secondary:hover { background-color: #C4126B !important; }
}

.link--small {
  font-size:  0.8571rem !important;
}

.link--simple {
  text-decoration: none !important;
  text-transform: none !important;
  font-size:  0.8571rem;
  color: var(--v-header-base) !important;
}

.link--medium {
  font-size:  1rem !important;
}

.link--large {
  font-size: 1.143rem !important;
}
.rounded {
  border-radius: 4px !important;
}

.link {
  text-transform: uppercase;
  text-decoration: underline !important;
}

@media #{map-get($display-breakpoints, 'md-and-up')}  {
  .action-button {
    font-size: 1.5rem !important;
    height: 56px !important;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')}  {
  .action-button {
    font-size: 1.286rem !important;
    height: 46px !important;
  }
}

.secondary-button {
  &:hover { background-color: var(--v-hover-base) !important; }
}

</style>
