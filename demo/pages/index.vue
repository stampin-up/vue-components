<template>
  <VContainer>
    <VTabs
      v-model="tab"
      background-color="deep-purple accent-4"
      class="mt-12 elevation-2"
      dark
    >
      <VTabsSlider />

      <VTab>
        SBtn
      </VTab>
      <VTab>
        SLoadingOverlay
      </VTab>

      <VTabItem class="backgroundLight">
        <ButtonDemo class="px-4 py-8 backgroundLight" />
      </VTabItem>
      <VTabItem>
        <LoadingOverlayDemo />
      </VTabItem>
    </VTabs>
  </VContainer>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import ButtonDemo from '../components/ButtonDemo'
import LoadingOverlayDemo from '../components/LoadingOverlayDemo'

@Component({
  components: { LoadingOverlayDemo, ButtonDemo }
})
export default class Homepage extends Vue {
    tab = 0
}
</script>

<style>
  .backgroundLight {
    background-color: #ebe6fa !important;
  }
</style>
