<template>
  <VLazyImage :src-placeholder="placeholder" v-bind="$attrs" class="lazy-image" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import VLazyImage from 'v-lazy-image'

@Component({
  components: {
    VLazyImage
  },
  inheritAttrs: false
})
export default class SBtn extends Vue {
  @Prop({ required: false, default: 'https://via.placeholder.com/360', type: String }) placeholder!: string
}
</script>

<style lang="scss" scoped>
.lazy-image {
  display: block;
  width: auto;
  max-width: 100%;
}

</style>
