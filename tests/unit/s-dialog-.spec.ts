import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils'
import { Vue } from 'vue/types/vue'
import Vuetify from 'vuetify'
import SDialog from '~/components/SDialog.vue'

let localVue: typeof Vue

describe('SDialog', () => {
  let component: Wrapper<SDialog>
  const title = 'Header'
  const text = 'Lorem ipsum'
  const cancelText = 'cancel'
  const width = 325

  beforeEach(() => {
    localVue = createLocalVue()
    component = shallowMount(SDialog, {
      localVue,
      propsData: { showDialog: true }
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

    expect(component.find('vdialog-stub').attributes().width).toEqual(`${width}`)
  })

  describe('focus return', () => {
    // Exposes the `dialog` ref VDialog has, the element it focuses on open.
    const VDialogStub = { template: '<div><div ref="dialog" tabindex="-1" data-testid="dialog-root"><slot /></div></div>' }
    let opener: HTMLButtonElement

    beforeEach(() => {
      opener = document.createElement('button')
      document.body.appendChild(opener)
      opener.focus()
    })

    afterEach(() => {
      opener.remove()
    })

    it('returns focus to the opener when the dialog closes', async () => {
      const wrapper = shallowMount(SDialog, { localVue, propsData: { showDialog: true } })
      await localVue.nextTick()
      opener.blur()

      wrapper.setProps({ showDialog: false })
      await localVue.nextTick()
      await localVue.nextTick()

      expect(document.activeElement).toBe(opener)
      wrapper.destroy()
    })

    it('returns focus to the opener when the dialog is destroyed while open (v-if consumers)', async () => {
      const wrapper = shallowMount(SDialog, { localVue, propsData: { showDialog: true } })
      await localVue.nextTick()
      opener.blur()

      wrapper.destroy()
      await localVue.nextTick()

      expect(document.activeElement).toBe(opener)
    })

    it('does not take focus back from something the owner focused while destroying it', async () => {
      const other = document.createElement('input')
      document.body.appendChild(other)
      const wrapper = shallowMount(SDialog, { localVue, propsData: { showDialog: true } })
      await localVue.nextTick()
      opener.blur()

      wrapper.destroy()
      other.focus()
      await localVue.nextTick()

      expect(document.activeElement).toBe(other)
      other.remove()
    })

    // VDialog focuses its own content element on open, so Escape pressed before
    // tabbing in finds focus there rather than on a control inside the card.
    it('returns focus to the opener when focus is on the dialog element itself', async () => {
      const host = document.body.appendChild(document.createElement('div'))
      const wrapper = shallowMount(SDialog, { localVue, attachTo: host, propsData: { showDialog: true }, stubs: { VDialog: VDialogStub } })
      await localVue.nextTick()
      ;(wrapper.find('[data-testid=dialog-root]').element as HTMLElement).focus()
      expect(document.activeElement).not.toBe(opener)

      wrapper.setProps({ showDialog: false })
      await localVue.nextTick()
      await localVue.nextTick()

      expect(document.activeElement).toBe(opener)
      wrapper.destroy()
      host.remove()
    })

    it('leaves focus inside the dialog when the owner reopens it before the restore runs', async () => {
      const host = document.body.appendChild(document.createElement('div'))
      // An owner that answers every close by opening the dialog again.
      const wrapper: Wrapper<Vue> = shallowMount(SDialog, {
        localVue,
        attachTo: host,
        propsData: { showDialog: true },
        stubs: { VDialog: VDialogStub },
        listeners: { 'update:show-dialog': (val: boolean) => { if (!val) { wrapper.setProps({ showDialog: true }) } } }
      })
      await localVue.nextTick()
      const dialogRoot = wrapper.find('[data-testid=dialog-root]').element as HTMLElement
      dialogRoot.focus()

      wrapper.setProps({ showDialog: false })
      await localVue.nextTick()
      await localVue.nextTick()

      expect(wrapper.props('showDialog')).toBe(true)
      expect(document.activeElement).toBe(dialogRoot)
      wrapper.destroy()
      host.remove()
    })

    it('does not move focus when the opener is no longer in the document', async () => {
      const wrapper = shallowMount(SDialog, { localVue, propsData: { showDialog: true } })
      await localVue.nextTick()
      opener.remove()

      wrapper.setProps({ showDialog: false })
      await localVue.nextTick()
      await localVue.nextTick()

      expect(document.activeElement).toBe(document.body)
      wrapper.destroy()
    })
  })
})

describe('SDialog in a real VDialog', () => {
  let wrapper: Wrapper<Vue>
  let host: HTMLElement

  const settle = async () => {
    for (let i = 0; i < 3; i++) {
      await localVue.nextTick()
    }
  }

  const DEFAULT_SLOT = '<button data-testid="first">First</button><a href="#" data-testid="last">Last</a>'

  const open = async (propsData = {}, slot = DEFAULT_SLOT) => {
    wrapper = mount(SDialog, {
      localVue,
      vuetify: new Vuetify(),
      attachTo: host,
      propsData: { showDialog: true, ...propsData },
      slots: { default: slot }
    })
    await settle()
  }

  const get = (testid: string) => document.querySelector(`[data-testid=${testid}]`) as HTMLElement
  const dialogRole = () => document.querySelector('[role=dialog]') as HTMLElement
  const press = (key: string, shiftKey = false) => {
    const event = new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true })
    ;(document.activeElement as HTMLElement).dispatchEvent(event)
    return event
  }

  beforeEach(() => {
    localVue = createLocalVue()
    // VDialog moves its content into [data-app]; mount into a child so attachTo does not replace it
    const app = document.createElement('div')
    app.setAttribute('data-app', 'true')
    host = app.appendChild(document.createElement('div'))
    document.body.appendChild(app)
    // jsdom has no layout, so treat everything outside [data-hidden] as rendered
    jest.spyOn(HTMLElement.prototype, 'getClientRects').mockImplementation(function (this: HTMLElement) {
      return (this.closest('[data-hidden]') ? [] : [{}]) as unknown as DOMRectList
    })
  })

  afterEach(() => {
    wrapper.destroy()
    document.body.innerHTML = ''
    jest.restoreAllMocks()
  })

  describe('focus trap', () => {
    it('wraps Tab from the last control to the first (the close button)', async () => {
      await open()
      get('last').focus()

      expect(press('Tab').defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(get('close-dialog'))
    })

    it('wraps Shift+Tab from the first control to the last', async () => {
      await open()
      get('close-dialog').focus()

      expect(press('Tab', true).defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(get('last'))
    })

    it('wraps Shift+Tab from the dialog itself, which VDialog focuses on open, to the last control', async () => {
      await open()
      ;(document.querySelector('.v-dialog') as HTMLElement).focus()

      press('Tab', true)

      expect(document.activeElement).toBe(get('last'))
    })

    it('leaves Tab between the controls in the middle to the browser', async () => {
      await open()
      get('first').focus()

      expect(press('Tab').defaultPrevented).toBe(false)
      expect(press('Tab', true).defaultPrevented).toBe(false)
    })

    it('skips disabled and hidden controls when finding the last one', async () => {
      await open({}, '<button data-testid="first">First</button><button disabled>Off</button><div data-hidden><button>Hidden</button></div>')
      get('first').focus()

      expect(press('Tab').defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(get('close-dialog'))
    })

    it('ignores keys other than Tab', async () => {
      await open()
      get('last').focus()

      expect(press('ArrowDown').defaultPrevented).toBe(false)
      expect(document.activeElement).toBe(get('last'))
    })
  })

  describe('accessible name', () => {
    it('labels the dialog with its title', async () => {
      await open({ title: 'Sign In' })

      const id = dialogRole().getAttribute('aria-labelledby') as string
      expect(document.getElementById(id)?.textContent?.trim()).toBe('Sign In')
    })

    it('prefers the consumer\'s aria-labelledby over the title', async () => {
      await open({ title: 'Sign In', ariaLabelledby: 'custom-heading' })

      expect(dialogRole().getAttribute('aria-labelledby')).toBe('custom-heading')
    })

    it('puts an aria-labelledby attribute on the dialog, not on the VDialog container', async () => {
      wrapper = mount({
        components: { SDialog },
        template: '<SDialog show-dialog aria-labelledby="slot-heading"><h2 id="slot-heading">Pick</h2></SDialog>'
      }, { localVue, vuetify: new Vuetify(), attachTo: host })
      await settle()

      expect(dialogRole().getAttribute('aria-labelledby')).toBe('slot-heading')
      expect(document.querySelector('.v-dialog__container')?.hasAttribute('aria-labelledby')).toBe(false)
    })

    it('gives each dialog its own title id', async () => {
      wrapper = mount({
        components: { SDialog },
        template: '<div><SDialog show-dialog title="One" /><SDialog show-dialog title="Two" /></div>'
      }, { localVue, vuetify: new Vuetify(), attachTo: host })
      await settle()

      const ids = Array.from(document.querySelectorAll('[role=dialog]')).map(el => el.getAttribute('aria-labelledby'))
      expect(ids.map(id => document.getElementById(id as string)?.textContent?.trim())).toEqual(['One', 'Two'])
    })

    it('leaves the dialog unlabelled when there is no title or aria-labelledby', async () => {
      await open()

      expect(dialogRole().hasAttribute('aria-labelledby')).toBe(false)
    })
  })
})
