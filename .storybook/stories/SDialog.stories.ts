
import SDialog from '../../src/components/SDialog.vue'
import SBtn from '../../src/components/SBtn.vue'
import { text, number, boolean } from '@storybook/addon-knobs'

export default { title: 'SDialog' }
const title = `Header`
const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat nisl non mi iaculis placerat non at nulla.`
const cancel = `cancel`
export const asDefault = () => ({
  components: {
    SDialog,
    SBtn
  },
  props: {
    title: { default: text('Title Text', title ) },
    text: { default: text('Subheader Text', lipsum) },
    buttonText: { default: text('Button text', 'Confirm') },
    cancelText: { default: text('Cancel text', cancel) },
    width: {  default: number('width', 325) },
    showDialog: { default: boolean('Show Dialog', true) }
},
  template: `
  <VCard class="pa-4 elevation-4">
    <SDialog
      v-bind="$props"
    >
      <VRow v-if="buttonText" no-gutters>
        <VCol class="py-2" cols="12">
          <SBtn action block color="primary">{{ buttonText }}</SBtn>
        </VCol>
      </VRow>
    </SDialog>
  </VCard>
  `,
})
