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
    <template #activator="{ on }">
      <SBtn
        v-show="!text"
        ref="tooltipBtn"
        :height="size"
        :width="size"
        icon
        class="icon-btn"
        v-on="on"
      >
        <VIcon :color="color" :size="size" :aria-label="ariaHelp">
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
<script lang="ts" setup>
import { mdiHelpCircleOutline } from '@mdi/js'
import { computed, nextTick, onMounted, ref } from 'vue'
import SBtn from '../components/SBtn.vue'

interface Props {
  text?: string
  size?: string
  color?: string
  callout?: boolean
  position?: string
  ariaHelp?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '1.5rem',
  color: 'hover',
  text: undefined,
  position: '',
  ariaHelp: 'More Information'
})

enum CalloutPosition {
  LEFT,
  MIDDLE,
  RIGHT
}

const DIALOG_MAX_WIDTH = 320
const DIALOG_HALF_WIDTH = 160
const NUDGE_LEFT_OR_RIGHT = 134

const icons = { mdiHelpCircleOutline }

const offsetTopButton = ref(0)
const offsetLeftButton = ref(0)
const halfWindowHeight = ref(0)
const leftEdgeConstraint = ref(0)
const rightEdgeConstraint = ref(0)
const bottomAligned = ref(false)

const tooltipBtn = ref<InstanceType<typeof SBtn>>()
const tooltipLink = ref<InstanceType<typeof SBtn>>()

const tooltipStyle = computed(() => {
  let classList = ''
  const position: CalloutPosition = CalloutPosition[props.position.toUpperCase() as keyof typeof CalloutPosition]
  classList = props.callout ? 'callout' : 'tooltip'
  classList = (offsetTopButton.value <= halfWindowHeight.value) ? `${classList} bottom` : `${classList} top`
  if (position === CalloutPosition.MIDDLE) {
    classList = `${classList} middle`
  } else if (position === CalloutPosition.LEFT || offsetLeftButton.value <= leftEdgeConstraint.value) {
    classList = `${classList} left`
  } else if (position === CalloutPosition.RIGHT || offsetLeftButton.value >= rightEdgeConstraint.value) {
    classList = `${classList} right`
  } else {
    classList = `${classList} middle`
  }
  return classList
})
const setViewableWindowSize = () => {
  halfWindowHeight.value = window.innerHeight / 2
  leftEdgeConstraint.value = DIALOG_HALF_WIDTH
  rightEdgeConstraint.value = window.innerWidth - DIALOG_HALF_WIDTH
}
const setTooltipOffset = async () => {
  const button = tooltipBtn?.value.$el as HTMLElement
  const link = tooltipLink?.value.$el as HTMLElement
  const element = props.text ? link : button
  await nextTick()
  const { top, left } = getOffset(element)
  offsetTopButton.value = top - window.scrollY
  offsetLeftButton.value = left
  bottomAligned.value = offsetTopButton.value <= halfWindowHeight.value
}
const getOffset = (element: HTMLElement) => {
  let x = 0
  let y = 0

  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    x += element.offsetLeft - element.scrollLeft
    y += element.offsetTop - element.scrollTop
    element = element.offsetParent as HTMLElement
  }
  return { top: y, left: x }
}

const onResize = async () => {
  setViewableWindowSize()
  await setTooltipOffset()
}

const onScroll = async () => {
  await setTooltipOffset()
}

onMounted(() => {
  if (props.position && !Object.values(CalloutPosition).includes(props.position.toUpperCase())) {
    throw new Error('Tooltip position must be one of the following: undefined | left | middle | right')
  }
  setViewableWindowSize()
  setTooltipOffset()
})

defineExpose({
  offsetLeftButton,
  offsetTopButton,
  getOffset
})

</script>
<style lang="scss" scoped>
.tooltip,
.callout {
  padding: 24px;
  background-color: white;
  color: var(--v-primary-base);
  opacity: 1 !important;
  box-shadow: rgba(0, 0, 0, 0.3) 4px 4px 4px;
  border: 1px solid var(--v-border-base);

  &.top {
    margin-top: -8px;
  }

  &.bottom {
    margin-top: 8px;
  }
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

.left:after {
  left: 16px;
}

.middle:after {
  left: 47%;
}

.right:after {
  right: 16px;
}

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
