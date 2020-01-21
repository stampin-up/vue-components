<template>
  <VCard
    flat
    tile
  >
    <SBtn :action="action" :link-small="linkSmall" :link-medium="linkMedium" :link-large="linkLarge" :link="link">
      SBtn
    </SBtn>

    <VCardActions>
      <VCheckbox v-model="action" class="mx-2" label="Action" />
      <VCheckbox v-model="linkSmall" class="mx-2" label="Link Small" />
      <VCheckbox v-model="linkMedium" class="mx-2" label="Link Medium" />
      <VCheckbox v-model="linkLarge" class="mx-2" label="Link Large" />
      <VCheckbox v-model="link" class="mx-2" label="Link" />
    </VCardActions>
  </VCard>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class ButtonDemo extends Vue {
    action = false
    linkSmall = false
    linkMedium = false
    linkLarge = false
    link = false
}
</script>

<style>
</style>
