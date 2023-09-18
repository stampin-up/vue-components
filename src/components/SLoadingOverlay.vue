<template>
  <!--To use add class add-processing to content you wish to fill -->
  <VRow
    v-show="loading"
    no-gutters
    :class="{'overlay': loading}"
    class="loading-overlay"
  >
    <VProgressCircular
      :size="spinnerSize"
      :width="spinnerWidth"
      :color="spinnerColor"
      :class="{'d-none': !loading}"
      indeterminate
    />
  </VRow>
</template>

<script lang="ts" setup>
interface Props {
 loading?: boolean
 spinnerSize?: string
 spinnerWidth?: string
 spinnerColor?: string
}

withDefaults(defineProps<Props>(), {
  spinnerSize: '60',
  spinnerWidth: '6',
  spinnerColor: '#888'
})
</script>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  background: #fff;
  opacity: .7;
  justify-content: center;
  align-items: center;
  z-index: 2147483638;
}

</style>
