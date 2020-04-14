<template>
  <VTooltip
    v-bind="$attrs"
    dark
    open-on-click
    :open-on-hover="false"
    :content-class="tooltipStyle"
    bottom
    max-width="320px"
    open-delay="500"
    nudge-left="10px"
    nudge-bottom="8px"
    class="pa-3"
  >
    <template v-slot:activator="{ on }">
      <SBtn
        v-show="icon"
        :height="size"
        :width="size"
        icon
        v-on="on"
      >
        <VIcon :color="color" :size="size">
          {{ icons.mdiHelpCircleOutline }}
        </VIcon>
      </SBtn>
      <SBtn
        v-show="!icon"
        link-medium
        v-on="on"
      >
        {{ text }}
      </SBtn>
    </template>
    <slot />
  </VTooltip>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { mdiHelpCircleOutline } from '@mdi/js'
import SBtn from '../components/SBtn.vue'
@Component({
  components: {
    SBtn
  }
})
export default class TooltipComponent extends Vue {
  icons = { mdiHelpCircleOutline }
  @Prop({ type: Boolean, default: false })
  icon!: boolean

  @Prop({ type: String, default: null })
  text!: string | null

  @Prop({ type: String, default: '2rem' })
  size!: string

  @Prop({ type: String, default: 'hover' })
  color!: string

  @Prop({ type: Boolean, default: false })
  callout!: boolean

  @Prop({ type: Boolean, default: true })
  bottom!: boolean

  get tooltipStyle () {
    if (this.callout) {
      return this.bottom ? 'callout bottom' : 'callout'
    }
    return 'tooltip'
  }
}
</script>
<style lang="scss" scoped>
  .tooltip,
  .callout {
    padding: 24px;
    background-color: white;
    color: var(--v-primary-base);
    opacity: 1 !important;
    box-shadow: rgba(0, 0, 0, 0.3) 4px 4px 4px ;
    border: 1px solid var(--v-border-base);
  }
  .callout:after {
    height: 20px;
    width: 20px;
    content: "";
    background-color: white;
    position: absolute;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  .left:after {
    left: -11px;
    bottom: 40%;
    border-left: 1px solid var(--v-border-base);
    border-top: 1px solid var(--v-border-base);
  }
  .bottom:after {
    top: -10px;
    left: 50%;
    border-right: 1px solid var(--v-border-base);
    border-top: 1px solid var(--v-border-base);
  }
</style>
