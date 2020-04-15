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
    max-width="320px"
    open-delay="500"
    class="pa-3"
  >
    <template v-slot:activator="{ on }">
      <SBtn
        v-show="!text"
        :height="size"
        :width="size"
        icon
        v-on="on"
        ref="tooltipBtn"
        class="icon-btn"
      >
        <VIcon :color="color" :size="size">
          {{ icons.mdiHelpCircleOutline }}
        </VIcon>
      </SBtn>
      <SBtn
        v-show="text"
        link-medium
        v-on="on"
        ref="tooltipLink"
        class="link-btn"
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
  $refs!:  {
    tooltipBtn: SBtn,
    tooltipLink: SBtn 
  }

  @Prop({ type: String, default: null })
  text!: string | null

  @Prop({ type: String, default: '2rem' })
  size!: string

  @Prop({ type: String, default: 'hover' })
  color!: string

  @Prop({ type: Boolean, default: false })
  callout!: boolean

  offsetTopButton = 0
  offsetLeftButton = 0
  halfWindowHeight = 0
  leftEdgeConstraint = 0
  rightEdgeConstraint = 0
  bottomAligned = false
  classList = ''

  setViewableWindowSize () {
    this.halfWindowHeight = window.innerHeight / 2
    this.leftEdgeConstraint = 160
    this.rightEdgeConstraint = window.innerWidth - 160
  }

  async setTooltipOffset () {
    const positionY = window.scrollY
    const button = this.$refs.tooltipBtn.$el as HTMLElement
    const link = this.$refs.tooltipLink.$el as HTMLElement
    const offset = this.text ? link.offsetTop : button.offsetTop
    await this.$nextTick() 

    this.offsetTopButton = offset - window.scrollY
    this.offsetLeftButton = this.text ? link.offsetLeft: button.offsetLeft
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
    this.classList = this.callout ? 'callout' : 'tooltip'
    this.classList = this.offsetTopButton <= this.halfWindowHeight ? `${this.classList} bottom` : `${this.classList} top`

    if (this.offsetLeftButton <= this.leftEdgeConstraint) {
      this.classList = `${this.classList} left`
    } else if (this.offsetLeftButton >= this.rightEdgeConstraint) {
      this.classList = `${this.classList} right`
    } else {
      this.classList = `${this.classList} middle`
    }
    return this.classList
  }

  async mounted () {
    this.setViewableWindowSize()
    await this.setTooltipOffset()
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
