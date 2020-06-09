import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import { Vue } from 'vue/types/vue'
import SBackgroundPane from '~/components/SBackgroundPane.vue'

let localVue: typeof Vue

describe('SLoadingOverlay', () => {
  let component: Wrapper<SBackgroundPane>

  beforeEach(() => {
    localVue = createLocalVue()
    component = shallowMount(SBackgroundPane, {
      localVue
    })
  })

  it('should add padding if padded is true', async () => {
    component.setProps({
      padded: true
    })
    await localVue.nextTick()

    expect(component.classes()).toContain('pa-4')
    expect(component.classes()).toContain('pa-md-8')
  })

  it('shouldn\'t add padding if padded is false', async () => {
    component.setProps({
      padded: false
    })
    await localVue.nextTick()

    expect(component.classes()).not.toContain('pa-4')
    expect(component.classes()).not.toContain('pa-md-8')
  })

  it('should add shaded class if addBackground is true', async () => {
    component.setProps({
      addBackground: true
    })
    await localVue.nextTick()

    expect(component.classes()).toContain('shaded')
  })

  it('shouldn\'t add shaded class if addBackground is false', async () => {
    component.setProps({
      addBackground: false
    })
    await localVue.nextTick()

    expect(component.classes()).not.toContain('shaded')
  })

  it('should add xborders class if xBorders is true', async () => {
    component.setProps({
      xBorders: true
    })
    await localVue.nextTick()

    expect(component.classes()).toContain('x-borders')
  })

  it('should add frame class if xborders is false', async () => {
    component.setProps({
      xborders: false
    })
    await localVue.nextTick()

    expect(component.classes()).toContain('frame')
  })
})
