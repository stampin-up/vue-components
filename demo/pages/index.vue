<template>
  <VContainer>
    <SBtn />

    <SLoadingOverlay />
    <VTabs
      v-model="tab"
      background-color="deep-purple accent-4"
      class="elevation-2"
      dark
    >
      <v-tabs-slider />

      <VTab>
        SBtn
      </VTab>
      <VTab>
        SLoadingOverlay
      </VTab>

      <VTabItem>
        <ButtonDemo />
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
</style>
