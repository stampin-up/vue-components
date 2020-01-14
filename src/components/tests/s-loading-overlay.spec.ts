import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import { Vue } from 'vue/types/vue'
import SLoadingOverlay from '~/components/SLoadingOverlay.vue'

let localVue: typeof Vue
describe('SLoadingOverlay', () => {
  let component: Wrapper<SLoadingOverlay>
  const spinnerSize = '65'
  const spinnerWidth = '9'
  const spinnerColor = '#999'

  beforeEach(() => {
    localVue = createLocalVue()
    component = shallowMount(SLoadingOverlay, {
      localVue
    })
  })

  it('Classes contain .loading-overlay', () => {
    expect(component.classes()).toContain('loading-overlay')
  })

  it('should pass spinnerSize as size prop for VProgressCircular', async () => {
    component.setProps({
      spinnerSize
    })
    await localVue.nextTick()

    expect(component.find('vprogresscircular-stub').attributes().size).toEqual(spinnerSize)
  })

  it('should pass spinnerWidth as width prop for VProgressCircular', async () => {
    component.setProps({
      spinnerWidth
    })
    await localVue.nextTick()

    expect(component.find('vprogresscircular-stub').attributes().width).toEqual(spinnerWidth)
  })

  it('should pass spinnerColor as color prop for VProgressCircular', async () => {
    component.setProps({
      spinnerColor
    })
    await localVue.nextTick()

    expect(component.find('vprogresscircular-stub').attributes().color).toEqual(spinnerColor)
  })

  it('should set class "display-none" for VProgressCircular if loading is false', async () => {
    component.setProps({
      loading: false
    })
    await localVue.nextTick()

    expect(component.find('vprogresscircular-stub').attributes().class.includes('d-none')).toBe(true)
  })
  it('shouldn\'t set class "display-none" for VProgressCircular if loading is true', async () => {
    component.setProps({
      loading: true
    })
    await localVue.nextTick()

    expect(component.find('vprogresscircular-stub').attributes().class.includes('d-none')).toBe(false)
  })
})
