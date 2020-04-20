// @ts-nocheck
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Vue } from 'vue/types.vue'
import STooltip from '~/components/STooltip.vue'

let localVue: typeof Vue

describe('STooltip', () => {
  let component
  let vm

  beforeEach(() => {
    localVue = createLocalVue()
    component = shallowMount(STooltip, {
      localVue,
      propsData: { text: 'tooltip' },
      stubs: {
        VTooltip:
        '<VIcon />'
      }
    })

    vm = component.vm
    vm.setTooltipOffset = jest.fn()
    vm.setViewableWindowSize = jest.fn()

    // screen dimensions
    vm.halfWindowHeight = 500
    vm.leftEdgeContraint = 160
    vm.rightEdgeConstraint = 608
  })

  describe('tooltip in top half of screen', () => {
    beforeEach(() => {
      component.setProps({
        callout: true
      })
      // button position
      vm.offsetTopButton = 200
      vm.bottomAligned = false
    })
    it('tooltipStyle getter should return "callout bottom left" if callout is true and close to left edge', () => {
      // button position
      vm.offsetLeftButton = 100
      expect(component.vm.tooltipStyle).toEqual('callout bottom left')
    })

    it('tooltipStyle getter should return "callout bottom left" if callout is true and prop left is set', () => {
      component.setProps({
        left: true
      })

      // button position
      vm.offsetLeftButton = 400
      expect(component.vm.tooltipStyle).toEqual('callout bottom left')
    })

    it('tooltipStyle getter should return "callout bottom middle" if callout is true and in middle', () => {
      // button position
      vm.offsetLeftButton = 400
      expect(component.vm.tooltipStyle).toEqual('callout bottom middle')
    })

    it('tooltipStyle getter should return "callout bottom right" if callout is true and prop right is set', () => {
      component.setProps({
        right: true
      })

      // button position
      vm.offsetLeftButton = 400
      expect(component.vm.tooltipStyle).toEqual('callout bottom right')
    })

    it('tooltipStyle getter should return "callout bottom right" if callout is true and close to right edge', () => {
      // window properties
      vm.offsetLeftButton = 700
      expect(component.vm.tooltipStyle).toEqual('callout bottom right')
    })
  })

  describe('tooltip in bottom half of screen', () => {
    beforeEach(() => {
      component.setProps({
        callout: true
      })
      // button position
      vm.offsetTopButton = 700
      vm.bottomAligned = true
    })
    it('tooltipStyle getter should return "callout top left" if callout is true and close to left edge', () => {
      // button position
      vm.offsetLeftButton = 100
      expect(component.vm.tooltipStyle).toEqual('callout top left')
    })

    it('tooltipStyle getter should return "callout top left" if callout is true and left prop is set', () => {
      component.setProps({
        left: true
      })

      // button position
      vm.offsetLeftButton = 400
      expect(component.vm.tooltipStyle).toEqual('callout top left')
    })

    it('tooltipStyle getter should return "callout top middle" if callout is true and in middle', () => {
      // button position
      vm.offsetLeftButton = 400
      expect(component.vm.tooltipStyle).toEqual('callout top middle')
    })

    it('tooltipStyle getter should return "callout top right" if callout is true and right prop is set', () => {
      component.setProps({
        right: true
      })

      // button position
      vm.offsetLeftButton = 400
      expect(component.vm.tooltipStyle).toEqual('callout top right')
    })

    it('tooltipStyle getter should return "callout top right" if callout is true and close to right edge', () => {
      // window properties
      vm.offsetLeftButton = 700
      expect(component.vm.tooltipStyle).toEqual('callout top right')
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
