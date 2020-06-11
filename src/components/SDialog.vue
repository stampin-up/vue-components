<template>
  <VDialog
    v-bind="$attrs"
    :value="showDialog"
    :width="width"
  >
    <VCard v-click-outside="close" class="text-center pa-2" data-testid="confirm-dialog">
      <VRow no-gutters>
        <VCol cols="12" class="text-right">
          <SBtn
            color="primary"
            text
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
            <h4>
              {{ title }}
            </h4>
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardText
        v-if="text"
        class="text--primary font14 py-2"
      >
        {{ text }}
      </VCardText>
      <VCardActions class="py-0">
        <VRow no-gutters>
          <VCol cols="12">
            <slot />
          </VCol>
          <VCol v-if="cancelText" cols="12">
            <SBtn
              class="my-3"
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { mdiClose } from '@mdi/js'
import SBtn from '../components/SBtn.vue'

@Component({
  components: {
    SBtn
  },
  inheritAttrs: false
})
export default class SDialog extends Vue {
  icons = { mdiClose }

  @Prop({ required: false, type: String }) title!: string
  @Prop({ required: false, type: String }) text!: string
  @Prop({ required: false, type: String }) cancelText!: string
  @Prop({ required: false, default: 325, type: Number }) width!: number
  @Prop({ required: false, default: false, type: Boolean }) showDialog!: boolean

  close () {
    this.$emit('update:show-dialog', false)
    this.$emit('close')
  }
}

</script>

<style lang="scss" scoped>

</style>
