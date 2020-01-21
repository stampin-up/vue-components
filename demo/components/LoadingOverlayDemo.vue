<template>
  <VCard
    flat
    tile
  >
    <VContainer>
      <SLoadingOverlay loading :spinner-size="spinnerSize" :spinner-width="spinnerWidth" :spinner-color="spinnerColor">
        SBtn
      </SLoadingOverlay>
    </VContainer>

    <VCardActions>
      <VInput v-model="spinnerSize" class="mx-2" label="Size" />
      <VInput v-model="spinnerWidth" class="mx-2" label="Width" />
      <VInput v-model="spinnerColor" class="mx-2" label="Color" />
    </VCardActions>
  </VCard>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import SLoadingOverlay from './../../src/components/SLoadingOverlay.vue'

@Component({
  components: {
    SLoadingOverlay
  }
})
export default class SLoadingOverlayDemo extends Vue {
  spinnerSize = '60'

  spinnerWidth = '6'

  spinnerColor = '#888'
}
</script>

<style>
</style>
