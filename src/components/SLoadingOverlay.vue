<template>
  <!--To use add class add-processing to content you wish to fill -->
  <VRow
    v-show="loading"
    no-gutters
    :class="{'overlay': loading && !inline, 'loading-overlay--inline': loading && inline}"
    class="loading-overlay"
  >
    <VProgressCircular
      :size="spinnerSize"
      :width="spinnerWidth"
      :color="spinnerColor"
      :class="{'d-none': !loading}"
      :aria-label="resolvedLabel"
      indeterminate
    />
  </VRow>
</template>

<script lang="ts">
// Apps translate the label once by providing this key (a string, or a function so it
// follows locale changes) instead of passing `label` at every call site.
const LABEL_INJECTION_KEY = 'sLoadingOverlayLabel'

// Loads that finish sooner than this are not announced: a quick spinner is noise.
const ANNOUNCE_AFTER_MS = 500

// One polite status region for every overlay on the page (WCAG 4.1.3). A region per overlay
// repeats "Loading" when several start together (route loader plus a page overlay), and a
// category page would carry one per product card. The region lives on <body>, so overlays
// inside inert content (join steps) are still announced.
const active = new Map<object, () => string>()
let region: HTMLElement | null = null
let announceTimer: ReturnType<typeof setTimeout> | undefined

// Created on the first load, at least ANNOUNCE_AFTER_MS before its first text, so screen
// readers have registered it by then. Recreated if something removed it from the page.
const ensureRegion = (): HTMLElement => {
  if (region?.isConnected) {
    return region
  }
  region = document.createElement('div')
  region.setAttribute('role', 'status')
  region.setAttribute('aria-live', 'polite')
  region.setAttribute('data-testid', 'loading-announcer')
  // Inline, so it stays visually hidden whatever stylesheet the app loads.
  region.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;'
  document.body.appendChild(region)
  return region
}

const startLoading = (owner: object, getLabel: () => string) => {
  active.set(owner, getLabel)
  const target = ensureRegion()
  // Already announced, or about to be: one "Loading" covers every overlay that joins in.
  if (announceTimer || target.textContent) {
    return
  }
  announceTimer = setTimeout(() => {
    announceTimer = undefined
    const [firstLabel] = active.values()
    if (firstLabel) {
      ensureRegion().textContent = firstLabel()
    }
  }, ANNOUNCE_AFTER_MS)
}

const stopLoading = (owner: object) => {
  if (!active.delete(owner) || active.size) {
    return
  }
  clearTimeout(announceTimer)
  announceTimer = undefined
  if (region) {
    region.textContent = ''
  }
}
</script>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted, watch } from 'vue'

interface Props {
 loading?: boolean
 spinnerSize?: string
 spinnerWidth?: string
 spinnerColor?: string
 // Announced to screen readers while loading. Defaults to the app-provided label, then 'Loading'.
 label?: string
 // A centered placeholder in the normal flow instead of the full-cover overlay.
 inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  spinnerSize: '60',
  spinnerWidth: '6',
  spinnerColor: '#888',
  label: undefined,
  inline: false
})

const providedLabel = inject<string | (() => string) | null>(LABEL_INJECTION_KEY, null)

const resolvedLabel = computed(() => {
  const provided = typeof providedLabel === 'function' ? providedLabel() : providedLabel
  return props.label || provided || 'Loading'
})

// Identifies this overlay to the shared announcer. Client-only: the watcher never fires
// during SSR, and the initial state is reported on mount.
const owner = {}
const report = (loading: boolean) => loading
  ? startLoading(owner, () => resolvedLabel.value)
  : stopLoading(owner)

watch(() => props.loading, report)
onMounted(() => report(props.loading))
onBeforeUnmount(() => stopLoading(owner))
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

.loading-overlay--inline {
  width: 100%;
  justify-content: center;
  align-items: center;
}

</style>
