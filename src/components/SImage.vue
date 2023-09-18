<template>
  <img
    ref="root"
    :src="srcImage"
    :srcset="srcsetImage"
    :src-placeholder="placeholder"
    v-bind="$attrs"
    class="lazy-image"
    :class="{
      'v-lazy-image-loaded': loaded
    }"
    v-on="$listeners"
    @load="load"
  >
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Props {
 placeholder?: string
 src?: string
 srcset?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'https://res.cloudinary.com/stampin-up/image/upload/w_360,f_auto/v1588185111/loading_image.png',
  src: undefined,
  srcset: undefined
})

const emits = defineEmits<{
  (e: 'update:show-dialog', show: boolean): void
  (e: 'load'): void
  (e: 'intersect'): void
}>()

const observer = ref<IntersectionObserver>()
const intersected = ref(false)
const loaded = ref(false)
const intersectionOptions = ref({})
const root = ref<HTMLElement>()

const srcImage = computed(() => intersected.value && props.src ? props.src : props.placeholder)
const srcsetImage = computed(() => intersected.value && props.srcset ? props.srcset : false)
const intersectionAvailable = computed(() => typeof window !== 'undefined' && 'IntersectionObserver' in window)
const load = () => {
  if (root.value!.$el.getAttribute('src') !== props.placeholder) {
    loaded.value = true
    emits('load')
  }
}

onMounted(() => {
  if (intersectionAvailable.value) {
    observer.value = new IntersectionObserver((entries) => {
      const [image] = entries.slice(-1)
      if (image.isIntersecting) {
        intersected.value = true
        cleanup()
        emits('intersect')
      }
    }, intersectionOptions.value)
    observer.value.observe(root.value!.$el)
  } else {
    intersected.value = true
  }
})

const cleanup = () => {
  if (observer.value) {
    observer.value.disconnect()
  }
}

onUnmounted(cleanup)

</script>

<style lang="scss" scoped>
.lazy-image {
  display: block;
  width: 100%;
  max-width: 100%;
}
</style>
