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

  afterEach(() => {
    component.destroy()
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

  describe('screen-reader announcements', () => {
    const announcer = () => document.querySelector('[data-testid="loading-announcer"]')
    const announced = () => announcer()?.textContent ?? ''
    const wrappers: Wrapper<SLoadingOverlay>[] = []

    const mountOverlay = (options = {}) => {
      const wrapper = shallowMount(SLoadingOverlay, { localVue, ...options })
      wrappers.push(wrapper)
      return wrapper
    }

    const waitPastThreshold = async () => {
      jest.advanceTimersByTime(500)
      await localVue.nextTick()
    }

    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      wrappers.splice(0).forEach(wrapper => wrapper.destroy())
      document.body.innerHTML = ''
      jest.useRealTimers()
    })

    it('announces "Loading" through one polite status region once the wait passes the threshold', async () => {
      mountOverlay({ propsData: { loading: true } })

      expect(announcer()?.getAttribute('role')).toBe('status')
      expect(announcer()?.getAttribute('aria-live')).toBe('polite')

      jest.advanceTimersByTime(499)
      expect(announced()).toBe('')

      await waitPastThreshold()
      expect(announced()).toBe('Loading')
    })

    it('stays silent for loads that finish before the threshold', async () => {
      const wrapper = mountOverlay({ propsData: { loading: true } })
      jest.advanceTimersByTime(300)
      wrapper.setProps({ loading: false })
      await localVue.nextTick()

      await waitPastThreshold()
      expect(announced()).toBe('')
    })

    // The region has to be registered before its text arrives, so it is on the page as soon as
    // an overlay mounts, loading or not.
    it('puts the empty status region on the page before anything loads, and says nothing', async () => {
      mountOverlay({ propsData: { loading: false } })

      expect(announcer()?.getAttribute('role')).toBe('status')
      expect(announcer()?.getAttribute('aria-live')).toBe('polite')

      await waitPastThreshold()
      expect(announced()).toBe('')
    })

    // The route loader and a page overlay often load together; that is one wait, not two.
    it('shares one region and one announcement across overlays loading at once', async () => {
      mountOverlay({ propsData: { loading: true } })
      await waitPastThreshold()
      const second = mountOverlay({ propsData: { loading: false } })
      second.setProps({ loading: true })
      await localVue.nextTick()
      await waitPastThreshold()

      expect(document.querySelectorAll('[data-testid="loading-announcer"]')).toHaveLength(1)
      expect(announced()).toBe('Loading')
    })

    it('clears only once the last overlay stops loading', async () => {
      const first = mountOverlay({ propsData: { loading: true } })
      const second = mountOverlay({ propsData: { loading: true } })
      await waitPastThreshold()

      first.setProps({ loading: false })
      await localVue.nextTick()
      expect(announced()).toBe('Loading')

      second.setProps({ loading: false })
      await localVue.nextTick()
      expect(announced()).toBe('')
    })

    it('stops counting an overlay destroyed while loading', async () => {
      const wrapper = mountOverlay({ propsData: { loading: true } })
      await waitPastThreshold()
      wrapper.destroy()

      expect(announced()).toBe('')
    })

    it('announces again for a later, separate wait', async () => {
      const wrapper = mountOverlay({ propsData: { loading: true } })
      await waitPastThreshold()
      wrapper.setProps({ loading: false })
      await localVue.nextTick()
      wrapper.setProps({ loading: true })
      await localVue.nextTick()

      expect(announced()).toBe('')
      await waitPastThreshold()
      expect(announced()).toBe('Loading')
    })

    it('recreates the region if something removed it from the page', async () => {
      mountOverlay({ propsData: { loading: true } })
      await waitPastThreshold()
      wrappers.splice(0).forEach(wrapper => wrapper.destroy())
      document.body.innerHTML = ''

      mountOverlay({ propsData: { loading: true } })
      await waitPastThreshold()
      expect(announced()).toBe('Loading')
    })

    // A region recreated and filled in the same tick would not be announced.
    it('gives a region removed mid-wait the full wait again before writing to it', async () => {
      mountOverlay({ propsData: { loading: true } })
      jest.advanceTimersByTime(300)
      announcer()!.remove()

      await waitPastThreshold()
      expect(announcer()).not.toBeNull()
      expect(announced()).toBe('')

      await waitPastThreshold()
      expect(announced()).toBe('Loading')
    })

    // Another overlay recreating the region during the wait must not let the pending
    // announcement land on it early.
    it('restarts the wait when another overlay recreates the region mid-wait', async () => {
      mountOverlay({ propsData: { loading: true } })
      jest.advanceTimersByTime(300)
      announcer()!.remove()
      mountOverlay({ propsData: { loading: true } })

      jest.advanceTimersByTime(499)
      expect(announced()).toBe('')

      await waitPastThreshold()
      expect(announced()).toBe('Loading')
    })

    it('uses the label prop over the provided label', async () => {
      mountOverlay({
        propsData: { loading: true, label: 'Loading PayPal' },
        provide: { sLoadingOverlayLabel: 'Wird geladen' }
      })
      await waitPastThreshold()

      expect(announced()).toBe('Loading PayPal')
    })

    it('uses a provided string label', async () => {
      mountOverlay({ propsData: { loading: true }, provide: { sLoadingOverlayLabel: 'Wird geladen' } })
      await waitPastThreshold()

      expect(announced()).toBe('Wird geladen')
    })

    it('calls a provided label function so the text follows the locale', async () => {
      mountOverlay({ propsData: { loading: true }, provide: { sLoadingOverlayLabel: () => 'Chargement' } })
      await waitPastThreshold()

      expect(announced()).toBe('Chargement')
    })

    it('names the spinner with the same label', () => {
      const wrapper = mountOverlay({ propsData: { loading: true, label: 'Cargando' } })

      expect(wrapper.find('vprogresscircular-stub').attributes()['aria-label']).toBe('Cargando')
    })
  })

  describe('inline', () => {
    it('renders a placeholder instead of the full-cover overlay', async () => {
      component.setProps({ loading: true, inline: true })
      await localVue.nextTick()

      expect(component.classes()).toContain('loading-overlay--inline')
      expect(component.classes()).not.toContain('overlay')
    })

    it('uses the full-cover overlay by default', async () => {
      component.setProps({ loading: true })
      await localVue.nextTick()

      expect(component.classes()).toContain('overlay')
      expect(component.classes()).not.toContain('loading-overlay--inline')
    })
  })
})
