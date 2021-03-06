// Utilities
import { text, boolean, number } from '@storybook/addon-knobs'
import STooltip from '../../src/components/STooltip.vue'
export default { title: 'STooltip' }
const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat nisl non mi iaculis placerat non at nulla. Phasellus bibendum ultricies velit at tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales nisi lectus, in tristique orci volutpat ac. Aliquam hendrerit sodales risus sit amet scelerisque. Morbi tempus in turpis ac lobortis. Nulla non lacinia velit, at mollis elit.` 
export const asDefault = () => ({
  components: {
    STooltip
  },
  props: {
    text: { default: text('text', '') },
    size: { default: text('size', '2rem') },
    color: { default: text('color', '#888') },
    callout: { default: boolean('callout', true) },
    left: { default: boolean('left', false) },
    right: { default: boolean('right', false) },
    info: { default: text('info', lipsum) }
  },
  template: `
  <VContainer fluid>
      <VRow style="min-height: 1000px; min-width: 800px;">
        <VCol cols=4>
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4 class="text-center">
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4 class="text-end">
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4>
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4 class="text-center">
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4 class="text-end">
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4 class="align-self-end">
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4 class="text-center align-self-end">
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
        <VCol cols=4 class="text-end align-self-end">
          <STooltip v-bind="$props"> {{ info }} </STooltip>
        </VCol>
      </VRow>
  </VContainer>
  `,
})
