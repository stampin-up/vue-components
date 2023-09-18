<template>
  <div
    v-bind="$attrs"
    :class="{
      'frame': !xBorders,
      'x-borders': xBorders,
      'shaded': addBackground,
      'pa-4': padded,
      'pa-md-8': padded,
      'pa-0': !padded
    }"
  >
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
interface Props {
 padded?: boolean
 xBorders?: boolean
 addBackground?: boolean
}

withDefaults(defineProps<Props>(), {
  addBackground: true
})
</script>

<style lang="scss" scoped>
  .shaded {
    background-color: var(--v-backgroundDiv-base);
  }
  .frame {
    border: 1px solid var(--v-border-base);
    border-radius: 0px !important;
  }
  .x-borders {
    border-top: 1px solid var(--v-border-base);
    border-bottom: 1px solid var(--v-border-base);
    border-radius: 0px !important;
  }
  .x-borders + .x-borders {
    border-top: none;
  }
</style>
