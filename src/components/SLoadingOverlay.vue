<template>
  <!--To use add class add-processing to content you wish to fill -->
  <VLayout
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
  </VLayout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class SLoadingOverlay extends Vue {
  @Prop({ required: false, type: Boolean })
  loading!: boolean

  @Prop({ default: '60', type: String })
  spinnerSize!: string

  @Prop({ default: '6', type: String })
  spinnerWidth!: string

  @Prop({ default: '#888', type: String })
  spinnerColor!: string
}
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
