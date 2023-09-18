// @ts-nocheck
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Vue } from 'vue/types/vue'
import Vuetify from 'vuetify'
import STooltip from '~/components/STooltip.vue'

const vuetify = new Vuetify()
let localVue: typeof Vue

describe('STooltip', () => {
  let component
  let vm

  beforeEach(() => {
    localVue = createLocalVue()
    component = shallowMount(STooltip, {
      localVue,
      vuetify,
      propsData: { text: 'tooltip' },
      stubs: {
        VTooltip:   {
        template: `
        <div>
            <slot name="activator" />
            <slot />
        </div>`
      },
      }
    })
    vm = component.vm

    // screen dimensions
    window.innerHeight = 1000
    window.innerWidth = 608 + 160
    window.dispatchEvent(new Event('resize'))
  })

  describe('tooltip in top half of screen', () => {
    beforeEach(() => {
      component.setProps({
        callout: true
      })
      // button position
      // vm.offsetTopButton = 200
      // vm.bottomAligned = false
    })
    it('tooltipStyle getter should return "callout bottom left" if callout is true and close to left edge', async () => {
      // button position
      vm.offsetLeftButton = 100
      await localVue.nextTick()
      expect(component.html()).toContain('callout bottom left')
    })

    it('tooltipStyle getter should return "callout bottom middle" if callout is true and prop', async () => {
      component.setProps({
        position: 'middle'
      })

      // button position
      vm.offsetLeftButton = 100
      await localVue.nextTick()
      expect(component.html()).toContain('callout bottom middle')
    })

    it('tooltipStyle getter should return "callout bottom left" if callout is true and prop left is set', async () => {
      component.setProps({
        position: 'left'
      })

      // button position
      vm.offsetLeftButton = 400
      await localVue.nextTick()
      expect(component.html()).toContain('callout bottom left')
    })

    it('tooltipStyle getter should return "callout bottom middle" if callout is true and in middle', async () => {
      // button position
      vm.offsetLeftButton = 400
      await localVue.nextTick()
      expect(component.html()).toContain('callout bottom middle')
    })

    it('tooltipStyle getter should return "callout bottom right" if callout is true and prop right is set', async () => {
      component.setProps({
        position: 'right'
      })

      // button position
      vm.offsetLeftButton = 400
      await localVue.nextTick()
      expect(component.html()).toContain('callout bottom right')
    })

    it('tooltipStyle getter should return "callout bottom middle" if callout is true and close to right edge', async () => {
      component.setProps({
        position: 'middle'
      })

      // window properties
      vm.offsetLeftButton = 700
      await localVue.nextTick()
      expect(component.html()).toContain('callout bottom middle')
    })

    it('tooltipStyle getter should return "callout bottom right" if callout is true and close to right edge', async () => {
      // window properties
      vm.offsetLeftButton = 700
      await localVue.nextTick()
      expect(component.html()).toContain('callout bottom right')
    })
  })

  describe('tooltip in bottom half of screen', () => {
    beforeEach(() => {
      component.setProps({
        callout: true
      })
      // button position
      vm.offsetTopButton = 700
      // vm.bottomAligned = true
    })
    it('tooltipStyle getter should return "callout top left" if callout is true and close to left edge', async () => {
      // button position
      vm.offsetLeftButton = 100
      await localVue.nextTick()
      expect(component.html()).toContain('callout top left')
    })

    it('tooltipStyle getter should return "callout top middle" if callout is true and prop', async () => {
      component.setProps({
        position: 'middle'
      })

      // button position
      vm.offsetLeftButton = 100
      await localVue.nextTick()
      expect(component.html()).toContain('callout top middle')
    })

    it('tooltipStyle getter should return "callout top left" if callout is true and left prop is set', async () => {
      component.setProps({
        position: 'left'
      })

      // button position
      vm.offsetLeftButton = 400
      await localVue.nextTick()
      expect(component.html()).toContain('callout top left')
    })

    it('tooltipStyle getter should return "callout top middle" if callout is true and in middle', async () => {
      // button position
      vm.offsetLeftButton = 400
      await localVue.nextTick()
      expect(component.html()).toContain('callout top middle')
    })

    it('tooltipStyle getter should return "callout top right" if callout is true and right prop is set', async () => {
      component.setProps({
        position: 'right'
      })

      // button position
      vm.offsetLeftButton = 400
      await localVue.nextTick()
      expect(component.html()).toContain('callout top right')
    })

    it('tooltipStyle getter should return "callout top middle" if callout is true and close to right edge', async () => {
      component.setProps({
        position: 'middle'
      })

      // window properties
      vm.offsetLeftButton = 700
      await localVue.nextTick()
      expect(component.html()).toContain('callout top middle')
    })

    it('tooltipStyle getter should return "callout top right" if callout is true and close to right edge', async () => {
      // window properties
      vm.offsetLeftButton = 700
      await localVue.nextTick()
      expect(component.html()).toContain('callout top right')
    })
  })

  it('offset of tooltip should include sum of offset of parents', () => {
    const element = {
      offsetLeft: 0,
      offsetTop: 0,
      scrollLeft: 0,
      scrollTop: 0,
      offsetParent: {
        offsetLeft: 10,
        offsetTop: 20,
        scrollLeft: 0,
        scrollTop: 0,
        offsetParent: {
          offsetLeft: 40,
          offsetTop: 300,
          scrollLeft: 0,
          scrollTop: 0
        }
      }
    } as HTMLElement
    expect(vm.getOffset(element)).toEqual({ left: 50, top: 320 })
  })

  it('offset of tooltip should include sum of offset of parent and take scroll into account', () => {
    const element = {
      offsetLeft: 0,
      offsetTop: 0,
      scrollLeft: 0,
      scrollTop: 0,
      offsetParent: {
        offsetLeft: 10,
        offsetTop: 20,
        scrollLeft: 0,
        scrollTop: 0,
        offsetParent: {
          offsetLeft: 40,
          offsetTop: 300,
          scrollLeft: 40,
          scrollTop: 200
        }
      }
    } as HTMLElement
    expect(vm.getOffset(element)).toEqual({ left: 10, top: 120 })
  })
})
