
import SBackgroundPane from '../../src/components/SBackgroundPane.vue'
import { boolean, text } from '@storybook/addon-knobs'

export default { title: 'SBackgroundPane' }
const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat nisl non mi iaculis placerat non at nulla. Phasellus bibendum ultricies velit at tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales nisi lectus, in tristique orci volutpat ac. Aliquam hendrerit sodales risus sit amet scelerisque. Morbi tempus in turpis ac lobortis. Nulla non lacinia velit, at mollis elit.` 
export const asDefault = () => ({
  components: {
    SBackgroundPane
  },
  props: {
    padded: { default: boolean('padded', false ) },
    xBorders: { default: boolean('xBorders', false ) },
    addBackground: { default: boolean('addBackground', true ) },
    text: { default: text('Text', lipsum) }
  },
  template: `
  <VCard class="pa-4 elevation-4">
    <SBackgroundPane
      v-bind="$props"
      :class="{
        'frame': !xBorders,
        'x-borders': xBorders,
        'shaded': addBackground,
        'pa-4': padded,
        'pa-md-8': padded,
        'pa-0': !padded
      }"
    >
      <VRow class="px-2">
        <VCol>
          {{ text }}
        </VCol>
        </VRow>
    </SBackgroundPane>
  </VCard>
  `,
})
