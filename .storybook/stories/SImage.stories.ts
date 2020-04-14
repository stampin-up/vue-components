// Utilities
import { text } from '@storybook/addon-knobs'
import SImage from '../../src/components/SImage.vue'

export default { title: 'SImage' }

export const asDefault = () => ({
  components: {
    SImage
  },
  props: {
    src: { default: text('src', 'https://res.cloudinary.com/stampin-up/image/upload/w_360,f_auto/v1572892574/qa/images/default-source/product-image/147932.jpg' ) },
    placeholder: { default: text('src', 'https://via.placeholder.com/360' ) }
  },
  template: `
    <VCard class="pa-4 elevation-4">
      <SImage v-bind="$props" />
    </VCard>
  `,
})
