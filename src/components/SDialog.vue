<template>
  <VDialog
    ref="vDialog"
    v-model="innerValue"
    v-bind="$attrs"
    :width="width"
    :keep-content-alive="false"
    scrollable
    style="z-index:2147483640;"
    v-on="$listeners"
    @click:outside="close"
    @keydown="keepTabInside"
  >
    <template #activator="slotData">
      <slot name="activator" v-bind="slotData" />
    </template>
    <VCard class="text-center pa-2 confirm-dialog" :max-height="cardMaxHeight" data-testid="confirm-dialog">
      <VRow no-gutters>
        <VCol cols="12" class="text-right">
          <SBtn
            color="primary"
            text
            :class="{
              'sticky-close': stickyClose
            }"
            data-testid="close-dialog"
            :aria-label="ariaClose"
            @click="close"
          >
            <VIcon>{{ icons.mdiClose }}</VIcon>
          </SBtn>
        </VCol>
      </VRow>
      <VCardTitle
        v-if="title"
        class="text-uppercase font-weight-black pa-0"
      >
        <VRow no-gutters>
          <VCol cols="12" class="px-4 py-2">
            <h4 :id="titleId" :class="textClass">
              {{ title }}
            </h4>
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardText
        v-if="text"
        class="font14 py-2"
        :class="textClass ? textClass : 'text--primary'"
      >
        {{ text }}
      </VCardText>
      <slot />
      <VCardActions v-if="cancelText">
        <VRow no-gutters>
          <VCol cols="12">
            <SBtn
              class="mb-3"
              link-small
              data-testid="confirm-dialog-btn-cancel"
              @click="close"
            >
              {{ cancelText }}
            </SBtn>
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
<script lang="ts">
// Module scope, so every SDialog instance gets its own title id
let dialogCount = 0

export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { mdiClose } from '@mdi/js'
import SBtn from '../components/SBtn.vue'

interface Props {
 title?: string
 text?: string
 cancelText?: string
 width?: number
 showDialog: boolean
 stickyClose?: boolean
 cardMaxHeight?: string
 ariaClose?: string
 textClass?: string
 ariaLabelledby?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 325,
  ariaClose: 'Close',
  title: undefined,
  text: undefined,
  cancelText: undefined,
  cardMaxHeight: undefined,
  textClass: undefined,
  ariaLabelledby: undefined
})

const emits = defineEmits<{
  (e: 'update:show-dialog', show: boolean): void
  (e: 'close'): void
}>()

const icons = { mdiClose }
const innerValue = ref(props.showDialog)

// WCAG 2.4.3: remember the element that had focus when the dialog opened and
// give focus back to it when the dialog closes.
let opener: HTMLElement | null = null

const captureOpener = () => {
  if (typeof document === 'undefined') {
    return
  }
  const active = document.activeElement
  opener = active instanceof HTMLElement && active !== document.body ? active : null
}

const restoreOpenerFocus = () => {
  const target = opener
  opener = null
  if (!target) {
    return
  }
  nextTick(() => {
    if (target.isConnected) {
      target.focus()
    }
  })
}

watch(innerValue, (val) => {
  emits('update:show-dialog', val)
  if (val) {
    captureOpener()
  } else {
    restoreOpenerFocus()
  }
})
watch(() => props.showDialog, (newVal) => {
  innerValue.value = newVal
})

const FOCUSABLE = 'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'

const titleId = `s-dialog-title-${++dialogCount}`
const vDialog = ref<{ $refs: Record<string, HTMLElement | undefined> } | null>(null)

const tabbables = (root: HTMLElement) => Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE))
  .filter(el => !el.hasAttribute('disabled') && el.tabIndex >= 0 && el.getClientRects().length > 0)

// VDialog only pulls stray focus back when it thinks it is the topmost dialog, which fails whenever a
// stylesheet raises .v-dialog__content's z-index past VDialog's own. Wrap Tab here so focus stays inside.
const keepTabInside = (e: KeyboardEvent) => {
  const root = vDialog.value?.$refs.dialog
  if (e.key !== 'Tab' || !root) {
    return
  }
  const els = tabbables(root)
  const active = document.activeElement
  if (!els.length) {
    e.preventDefault()
    root.focus()
  } else if (e.shiftKey && (active === els[0] || active === root)) {
    e.preventDefault()
    els[els.length - 1].focus()
  } else if (!e.shiftKey && active === els[els.length - 1]) {
    e.preventDefault()
    els[0].focus()
  }
}

// VDialog renders role="dialog" itself and has no prop for its name, so set it once the lazy content exists.
const nameDialog = async () => {
  await nextTick()
  const content = vDialog.value?.$refs.content
  const labelledby = props.ariaLabelledby ?? (props.title ? titleId : undefined)
  if (!content) {
    return
  }
  if (labelledby) {
    content.setAttribute('aria-labelledby', labelledby)
  } else {
    content.removeAttribute('aria-labelledby')
  }
}

watch([innerValue, () => props.title, () => props.ariaLabelledby], () => {
  if (innerValue.value) {
    nameDialog()
  }
}, { flush: 'post' })
onMounted(() => {
  if (innerValue.value) {
    captureOpener()
    nameDialog()
  }
})
onBeforeUnmount(restoreOpenerFocus)

const close = () => {
  emits('update:show-dialog', false)
  emits('close')
}
</script>

<style lang="scss" scoped>
.sticky-close {
  position: fixed;
  z-index: 10;
  margin-left: -20px !important;
}
</style>
