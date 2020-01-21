<template>
  <VCard
    flat
    tile
  >
    <VCardText>
      <VContainer class="add-processing cont">
        <SLoadingOverlay loading :spinner-size="spinnerSize" :spinner-width="spinnerWidth" :spinner-color="spinnerColor">
          SBtn
        </SLoadingOverlay>
      </VContainer>
    </VCardText>

    <VCardActions>
      <VTextField v-model="spinnerSize" class="mx-2" label="Size" />
      <VTextField v-model="spinnerWidth" class="mx-2" label="Width" />
      <VTextField v-model="spinnerColor" class="mx-2" label="Color" />
    </VCardActions>
  </VCard>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class LoadingOverlayDemo extends Vue {
  spinnerSize = '60'

  spinnerWidth = '6'

  spinnerColor = '#888'
}
</script>

<style lang="scss">
.cont {
  height: 100px;
}
</style>
