// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import SImage from '~/components/SImage.vue'

const SRC = 'https://img.test/w_1200/product.jpg'
const SRCSET = 'https://img.test/w_600/product.jpg 600w, https://img.test/w_1200/product.jpg 1200w'
const LOADING = 'https://img.test/loading.png'

describe('SImage', () => {
  // jsdom has no IntersectionObserver, and without one SImage treats the image
  // as intersected the moment it mounts - which hides every ordering defect
  // below. This stub never fires on its own; `intersect()` fires it on demand.
  let intersect: () => void

  beforeEach(() => {
    intersect = () => { throw new Error('observer was never attached') }
    window.IntersectionObserver = jest.fn(onEntries => ({
      observe: () => { intersect = () => onEntries([{ isIntersecting: true }]) },
      disconnect: jest.fn()
    }))
  })

  afterEach(() => {
    delete window.IntersectionObserver
  })

  describe('when the placeholder is the src', () => {
    // A caller that passes its real src as the placeholder has opted out of the
    // loading-image swap. Holding srcset back until intersection made the
    // browser start fetching src, then abort it once srcset arrived and it
    // re-selected a candidate - one cancelled request per image.
    const mountEager = () => shallowMount(SImage, {
      propsData: { src: SRC, placeholder: SRC, srcset: SRCSET }
    })

    it('renders srcset on the first render, before intersection', () => {
      const wrapper = mountEager()

      expect(wrapper.attributes('src')).toBe(SRC)
      expect(wrapper.attributes('srcset')).toBe(SRCSET)
    })

    it('marks itself loaded when the image loads', async () => {
      // The src-vs-placeholder check could never pass here, because the two
      // are the same URL - so `loaded` and the `load` event never fired.
      const wrapper = mountEager()

      await wrapper.trigger('load')

      expect(wrapper.classes()).toContain('v-lazy-image-loaded')
      expect(wrapper.emitted('load')).toHaveLength(1)
    })
  })

  describe('when the placeholder is a separate loading image', () => {
    const mountLazy = () => shallowMount(SImage, {
      propsData: { src: SRC, placeholder: LOADING, srcset: SRCSET }
    })

    it('shows the placeholder without srcset until the image intersects', () => {
      const wrapper = mountLazy()

      expect(wrapper.attributes('src')).toBe(LOADING)
      expect(wrapper.attributes('srcset')).toBeUndefined()
    })

    it('swaps in src and srcset together on intersection', async () => {
      const wrapper = mountLazy()

      intersect()
      await wrapper.vm.$nextTick()

      expect(wrapper.attributes('src')).toBe(SRC)
      expect(wrapper.attributes('srcset')).toBe(SRCSET)
    })

    it('does not report the placeholder\'s own load as the image loading', async () => {
      const wrapper = mountLazy()

      await wrapper.trigger('load')

      expect(wrapper.classes()).not.toContain('v-lazy-image-loaded')
      expect(wrapper.emitted('load')).toBeUndefined()
    })

    it('reports the real image loading once it has swapped in', async () => {
      const wrapper = mountLazy()

      intersect()
      await wrapper.vm.$nextTick()
      await wrapper.trigger('load')

      expect(wrapper.classes()).toContain('v-lazy-image-loaded')
      expect(wrapper.emitted('load')).toHaveLength(1)
    })
  })

  it('omits the srcset attribute when no srcset is given', () => {
    const wrapper = shallowMount(SImage, { propsData: { src: SRC, placeholder: SRC } })

    expect(wrapper.attributes('srcset')).toBeUndefined()
  })
})
