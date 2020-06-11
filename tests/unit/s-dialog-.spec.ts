import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import { Vue } from 'vue/types/vue'
import SDialog from '~/components/SDialog.vue'

let localVue: typeof Vue

describe('SDialog', () => {
  let component: Wrapper<SDialog>
  const title = 'Header'
  const text = 'Lorem ipsum'
  const cancelText = 'cancel'
  const width = '325'

  beforeEach(() => {
    localVue = createLocalVue()
    component = shallowMount(SDialog, {
      localVue
    })
  })

  it('should not have title text, or cancel button if props not passed', () => {
    expect(component.find('vcardtitle-stub').exists()).toBeFalsy()
    expect(component.find('vcardtext-stub').exists()).toBeFalsy()
    expect(component.find('[data-testid=confirm-dialog-btn-cancel]').exists()).toBeFalsy()
  })

  it('should set title properly', async () => {
    component.setProps({
      title
    })
    await localVue.nextTick()

    expect(component.find('vcardtitle-stub').text().includes(title)).toBeTruthy()
  })

  it('should set text properly', async () => {
    component.setProps({
      text
    })
    await localVue.nextTick()

    expect(component.find('vcardtext-stub').text().includes(text)).toBeTruthy()
  })

  it('should set cancel text properly', async () => {
    component.setProps({
      cancelText
    })
    await localVue.nextTick()

    expect(component.text().includes(cancelText)).toBeTruthy()
  })

  it('should pass width as prop for VDialog', async () => {
    component.setProps({
      width
    })
    await localVue.nextTick()

    expect(component.find('vdialog-stub').attributes().width).toEqual(width)
  })
})
