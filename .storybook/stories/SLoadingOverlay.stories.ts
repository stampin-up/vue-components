// Utilities
import { text, boolean, number } from '@storybook/addon-knobs'
import SLoadingOverlay from '../../src/components/SLoadingOverlay.vue'

export default { title: 'SLoadingOverlay' }

const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat nisl non mi iaculis placerat non at nulla. Phasellus bibendum ultricies velit at tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales nisi lectus, in tristique orci volutpat ac. Aliquam hendrerit sodales risus sit amet scelerisque. Morbi tempus in turpis ac lobortis. Nulla non lacinia velit, at mollis elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer porttitor sagittis lorem quis rutrum. Suspendisse sit amet nulla turpis.

Quisque a urna sollicitudin, pulvinar nunc sed, tempus magna. Ut malesuada tortor nec consectetur congue. Suspendisse elementum rhoncus mauris imperdiet dapibus. Nulla justo mi, ultricies quis dapibus dictum, finibus ut enim. Aenean mi odio, interdum dictum aliquam ac, placerat eu libero. Cras pharetra venenatis enim, non hendrerit neque tempus vel. Aliquam erat volutpat. Suspendisse eget semper magna. Nullam pellentesque, ante tristique blandit lacinia, nisl nulla semper nisi, eu feugiat purus urna eget nisi. Nunc interdum, mauris sit amet ullamcorper malesuada, mauris dolor sodales enim, et facilisis odio metus at nisl. Proin eleifend tempor ipsum vel venenatis. Donec fringilla eu eros non dictum. Praesent ac urna euismod nulla dictum tempus tempor vitae sapien.

Quisque vitae risus condimentum, tincidunt urna nec, interdum mi. Fusce at dictum eros. Sed ac ante finibus, aliquam ante a, tempor justo. Quisque eget lobortis urna, vel sodales neque. Sed et ex porta, commodo diam at, faucibus urna. Nam hendrerit ligula eu dui volutpat rutrum. Pellentesque dapibus nisl id ultricies ullamcorper. Morbi faucibus dapibus finibus. Nullam sit amet quam cursus, finibus tellus ac, dignissim augue.

Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam at dictum quam, non lacinia lectus. Mauris lobortis purus tempor mollis pretium. Curabitur tincidunt commodo lacus, nec sodales risus molestie vel. Nam ac rhoncus tortor, in interdum nisi. Ut aliquet pretium velit, at tempus ligula. Nulla sollicitudin vel metus at ultrices. Praesent malesuada lorem finibus volutpat ultrices. Nunc pharetra nisi odio, sed blandit magna vestibulum nec. Quisque in facilisis metus. Donec egestas condimentum dui, ac vestibulum libero hendrerit ultricies. Vestibulum cursus vulputate pharetra.

Nulla bibendum, ipsum sit amet porta auctor, lectus quam sodales est, ac vehicula erat nunc in velit. Cras et hendrerit lorem, a vehicula sapien. Ut arcu nunc, pellentesque mollis justo sed, convallis convallis elit. Vivamus mollis nibh quis malesuada mollis. Praesent mattis turpis in fringilla posuere. Morbi a malesuada nisl. Integer vel tincidunt magna. Ut lorem dolor, tristique sed consectetur sed, congue fermentum nunc. Cras efficitur turpis sagittis dui cursus dignissim. Donec porta id justo nec aliquam. Vestibulum vitae porta dui.`

export const asDefault = () => ({
  components: {
    SLoadingOverlay
  },
  props: {
    loading: { default: boolean('loading', false ) },
    spinnerSize: { default: number('spinnerSize', 60 ) },
    spinnerWidth: { default: number('spinnerWidth', 6 ) },
    spinnerColor: { default: text('spinnerColor', '#888' ) },
    text: { default: text('Text', lipsum) }
  },
  template: `
  <VCard class="pa-4 elevation-4">
    <SLoadingOverlay v-bind="$props"/>
    <span style="white-space: pre">{{ text }}</span>
  </VCard>
  `,
})
