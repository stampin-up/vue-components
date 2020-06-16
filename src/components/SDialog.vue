<template>
  <VDialog
    v-model="innerValue"
    v-bind="$attrs"
    :width="width"
    scrollable
    @click:outside="close"
  >
    <template v-slot:activator="slotData">
      <slot name="activator" v-bind="slotData" />
    </template>
    <VCard class="text-center pa-2" max-height="700" data-testid="confirm-dialog">
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
      <slot :class="{'pb-2' : !cancelText }" />
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
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
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
  @Prop({ required: true, type: Boolean }) showDialog!: boolean

  innerValue: boolean | null | undefined = null

  @Watch('innerValue')
  public onInnerChange (val: this['innerValue']) {
    this.$emit('update:show-dialog', val)
  }

  @Watch('showDialog')
  public onOuterChange (newVal: this['showDialog']) {
    this.innerValue = newVal
  }

  created () {
    this.innerValue = this.showDialog
  }

  close () {
    this.$emit('update:show-dialog', false)
    this.$emit('close')
  }
}

</script>

<style lang="scss" scoped>

</style>