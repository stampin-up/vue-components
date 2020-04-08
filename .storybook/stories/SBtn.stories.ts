// Utilities
import { text, boolean } from '@storybook/addon-knobs'
import SBtn from '../../src/components/SBtn.vue'

export default { title: 'SBtn' }

export const asDefault = () => ({
  components: {
    SBtn
  },
  props: {
    action: { default: boolean('action', false ) },
    linkSmall: { default: boolean('linkSmall', false ) },
    linkMedium: { default: boolean('linkMedium', false ) },
    linkLarge: { default: boolean('linkLarge', false ) },
    titleText: { default: text('Button text', 'The best button') }
  },
  template: `
    <VCard class="pa-4 elevation-4">
      <SBtn v-bind="$props">{{ titleText }}</SBtn>
    </VCard>
  `,
})
