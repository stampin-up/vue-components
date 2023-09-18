<template>
  <VDialog
    v-model="innerValue"
    v-bind="$attrs"
    :width="width"
    :keep-content-alive="false"
    scrollable
    style="z-index:2147483640;"
    v-on="$listeners"
    @click:outside="close"
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
            <h4 :class="textClass">
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
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { mdiClose } from '@mdi/js'
import SBtn from "../components/SBtn.vue";

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
}

const props = withDefaults(defineProps<Props>(), {
  width: 325,
  ariaClose: 'Close',
  title: undefined,
  text: undefined,
  cancelText: undefined,
  cardMaxHeight: undefined,
  textClass: undefined
})

const emits = defineEmits<{
  (e: 'update:show-dialog', show: boolean): void
  (e: 'close'): void
}>()

const icons = { mdiClose }
const innerValue = ref(props.showDialog)

watch(innerValue, (val) => {
  emits('update:show-dialog', val)
})
watch(() => props.showDialog, (newVal) => {
  innerValue.value = newVal
})

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
