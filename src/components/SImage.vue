<template>
  <img
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
// adapted from https://github.com/alexjoverm/v-lazy-image/blob/master/src/index.js
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
  },
  inheritAttrs: false
})
export default class SImage extends Vue {
  @Prop({ required: false, default: 'https://res.cloudinary.com/stampin-up/image/upload/w_360,f_auto/v1588185111/loading_image.png', type: String }) placeholder!: string
  @Prop({ required: false, type: String }) src?: string
  @Prop({ required: false, type: String }) srcset?: string

  observer: IntersectionObserver | null = null
  intersected = false
  loaded = false
  intersectionOptions = {}

  get srcImage () {
    return this.intersected && this.src ? this.src : this.placeholder
  }

  get srcsetImage () {
    return this.intersected && this.srcset ? this.srcset : false
  }

  get intersectionAvailable () {
    return typeof window !== 'undefined' && 'IntersectionObserver' in window
  }

  load () {
    if (this.$el.getAttribute('src') !== this.placeholder) {
      this.loaded = true
      this.$emit('load')
    }
  }

  mounted () {
    if (this.intersectionAvailable) {
      this.observer = new IntersectionObserver((entries) => {
        const [image] = entries.slice(-1)
        if (image.isIntersecting) {
          this.intersected = true
          this.cleanup()
          this.$emit('intersect')
        }
      }, this.intersectionOptions)
      this.observer.observe(this.$el)
    } else {
      this.intersected = true
    }
  }

  cleanup () {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  destroyed () {
    this.cleanup()
  }
}
</script>

<style lang="scss" scoped>
.lazy-image {
  display: block;
  width: 100%;
  max-width: 100%;
}
</style>
