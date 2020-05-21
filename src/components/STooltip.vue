<template>
  <VTooltip
    v-scroll="onScroll"
    v-resize="onResize"
    v-bind="$attrs"
    dark
    open-on-click
    :top="!bottomAligned"
    :bottom="bottomAligned"
    :open-on-hover="false"
    :content-class="tooltipStyle"
    :nudge-left="position === 'right' ? NUDGE_LEFT_OR_RIGHT : 0"
    :nudge-right="position === 'left' ? NUDGE_LEFT_OR_RIGHT : 0"
    :max-width="DIALOG_MAX_WIDTH"
    open-delay="500"
    class="pa-3"
  >
    <template v-slot:activator="{ on }">
      <SBtn
        v-show="!text"
        ref="tooltipBtn"
        :height="size"
        :width="size"
        icon
        class="icon-btn"
        v-on="on"
      >
        <VIcon :color="color" :size="size">
          {{ icons.mdiHelpCircleOutline }}
        </VIcon>
      </SBtn>
      <SBtn
        v-show="text"
        ref="tooltipLink"
        link-medium
        class="link-btn"
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

enum CalloutPosition {
  LEFT,
  MIDDLE,
  RIGHT 
}

@Component({
  components: {
    SBtn
  }
})
export default class STooltip extends Vue {
  DIALOG_MAX_WIDTH = 320
  DIALOG_HALF_WIDTH = 160
  NUDGE_LEFT_OR_RIGHT = 134

  icons = { mdiHelpCircleOutline }
  $refs!: {
    tooltipBtn: SBtn,
    tooltipLink: SBtn
  }

  @Prop({ type: String, default: null })
  text!: string | null

  @Prop({ type: String, default: '1.5rem' })
  size!: string

  @Prop({ type: String, default: 'hover' })
  color!: string

  @Prop({ type: Boolean, default: false })
  callout!: boolean

  @Prop({ type: String, default: '' })
  position!: string 

  offsetTopButton = 0
  offsetLeftButton = 0
  halfWindowHeight = 0
  leftEdgeConstraint = 0
  rightEdgeConstraint = 0
  bottomAligned = false
  classList = ''

  setViewableWindowSize () {
    this.halfWindowHeight = window.innerHeight / 2
    this.leftEdgeConstraint = this.DIALOG_HALF_WIDTH
    this.rightEdgeConstraint = window.innerWidth - this.DIALOG_HALF_WIDTH
  }

  async setTooltipOffset () {
    const button = this.$refs.tooltipBtn?.$el as HTMLElement
    const link = this.$refs.tooltipLink?.$el as HTMLElement
    const element = this.text ? link : button
    await this.$nextTick()
    const { top, left } = this.getOffset(element)
    this.offsetTopButton = top - window.scrollY
    this.offsetLeftButton = left
    this.bottomAligned = this.offsetTopButton <= this.halfWindowHeight
  }

  async onResize () {
    this.setViewableWindowSize()
    await this.setTooltipOffset()
  }

  async onScroll () {
    await this.setTooltipOffset()
  }

  get tooltipStyle () {
    const position: CalloutPosition= (<any>CalloutPosition)[this.position]
    this.classList = this.callout ? 'callout' : 'tooltip'
    this.classList = (this.offsetTopButton <= this.halfWindowHeight) ? `${this.classList} bottom` : `${this.classList} top`
    if (position === CalloutPosition.MIDDLE) {
      this.classList = `${this.classList} middle`
    } else if (position === CalloutPosition.LEFT || this.offsetLeftButton <= this.leftEdgeConstraint) {
      this.classList = `${this.classList} left`
    } else if (position ===CalloutPosition.RIGHT || this.offsetLeftButton >= this.rightEdgeConstraint) {
      this.classList = `${this.classList} right`
    } else {
      this.classList = `${this.classList} middle`
    }
    return this.classList
  }

  async mounted () {
    if (this.position && !Object.values(CalloutPosition).includes(this.position.toUpperCase())) {
      throw new Error('Tooltip position must be one of the following: undefined | left | middle | right')
    }
    this.setViewableWindowSize()
    await this.setTooltipOffset()
  }

  getOffset (element: HTMLElement) {
    let x = 0
    let y = 0
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      x += element.offsetLeft - element.scrollLeft
      y += element.offsetTop - element.scrollTop
      element = element.offsetParent as HTMLElement
    }
    return { top: y, left: x }
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
    &.top { margin-top: -8px; }
    &.bottom { margin-top: 8px; }
  }
  .callout:after {
    height: 20px;
    width: 20px;
    content: "";
    background-color: white;
    position: absolute;
    transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  .left:after { left: 16px; }
  .middle:after { left: 47%; }
  .right:after { right: 16px; }
  .top:after {
    bottom: -10px;
    border-left: 1px solid var(--v-border-base);
    border-bottom: 1px solid var(--v-border-base);
  }
  .bottom:after {
    top: -10px;
    border-right: 1px solid var(--v-border-base);
    border-top: 1px solid var(--v-border-base);
  }
</style>
