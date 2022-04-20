// Utilities
import { text, boolean } from '@storybook/addon-knobs'
import STypography from '../../src/components/STypography.vue'

export default { title: 'Typography' }

export const Typography = () => ({
  components: {
    STypography
  },
  props: {
    h1: { default: boolean('h1', true ) },
    h2: { default: boolean('h2', false ) },
    h3: { default: boolean('h3', false ) },
    h4: { default: boolean('h4', false ) },
    h5: { default: boolean('h5', false ) },
    h6: { default: boolean('h6', false ) },
    p: { default: boolean('p', false ) },
    titleText: { default: text('Header text', 'Enter Text Here') }
  },
  template: `
  <VContainer class="pa-12">  
    <VCard class="elevation-2 pa-8">
        <h2 class="text-capitalize">Brand Typeface</h2>
        <v-divider class="my-4"></v-divider>
        <h6 style="text-transform:capitalize;">Proxima Nova</h6>
        <div style="color:#888;">Light, Regular, Semi-Bold, Bold</div>
        <v-divider class="my-4"></v-divider>
        <h6 style="text-transform:capitalize;">Palatino</h6>
        <div style="color:#888;">Web only serif typeface for content body type.</div>
    </VCard>   
    <VCard class="elevation-2 pa-8 my-12">
      <h3 class="text-capitalize">Headers</h3>
      <v-divider class="my-4"></v-divider>
      <h1>header 1</h1>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 4rem (56px); font-weight: 300 (light); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 3.429rem (48px); font-weight: 300 (light); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 2.857rem (40px); font-weight: 300 (light); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <h2 class="pt-4">header 2</h2>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 2.857rem (40px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 2.286rem (32px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 1.714rem (24px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <h3 class="pt-4">header 3</h3>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 1.643rem (23px); font-weight: 600 (semi-bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 1.5rem (21px); font-weight: 600 (semi-bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 1.357rem (19px); font-weight: 600 (semi-bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <h5 class="pt-4">header 4</h5>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 1.429rem (20px); font-weight: 700 (bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 1.286rem (18px); font-weight: 700 (bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 1.143rem (16px); font-weight: 700 (bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <h6 class="pt-4">header 5</h6>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 1.286rem (18px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 1.143rem (16px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 1rem (14px); font-weight: 600 (semi-bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
    </VCard>
    <VCard class="elevation-2 pa-8 my-12">
      <h3 class="text-capitalize">Body Types</h3>
      <v-divider class="my-4"></v-divider>
      <p class="mb-0">paragraph</p>
      <div style="color:#888;"><strong>Desktop/Tablet:</strong> font-size: 1.143rem (16px); line-height: normal; (normal per browser = 1.2)</div>
      <div style="color:#888;" class="mb-4"><strong>mobile:</strong> font-size: 1rem (14px); line-height: normal; (normal per browser = 1.2)</div>
      <label class="pt-4">label</label>
      <a class="footer-link pt-4">Footer-Link</a>
      <div style="color:#888;">font-size: 1rem (14px); color: var(--v-primary-base)!important; display: block; justify-content: start;<br>(will have to capitalize appropriately in Lokalise, no text-transform set here to accomodate for translations)</div>
      <div class="footer-link--legal pt-4">Footer-Link--Legal (copyright area)</div>
      <div style="color:#888;">font-size: .8571rem (12px); color: var(--v-hover-base)!important; text-transform: uppercase;</div>
      <div class="details pt-4"><span>details</span></div>
      <div style="color:#888;">font-size: .7857rem (11px); text-transform: uppercase; color: var(--v-greyedOut-base);</div>
      <div class="fine-print pt-4">Fine-print</div>
      <div style="color:#888;">font-size: .8571rem (12px);</div>
    </VCard>
    <VCard class="elevation-2 pa-8 my-12">
      <h3 class="text-capitalize">Links</h3>
      <v-divider class="my-4"></v-divider>
      <p class="mb-0"><a>anchor tags - links in content</a></p>
      <div style="color:#888;">Color: #00B3A8 (Bermuda Bay)</div>
    </VCard>
    <VCard class="elevation-2 pa-8 my-12">
      <h3 class="text-capitalize">Display Styles</h3>
      <p class="pt-4">Add the following to any header tag to change the style to that of another header tag. We would use this if we want to keep a hierarchy of header tags on a webpage for SEO purposes, but visually want a different style.</p>
      <v-divider class="my-4"></v-divider>
      <h2 class="display-h1">display-h1</h2>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 4rem (56px); font-weight: 300 (light); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 3.429rem (48px); font-weight: 300 (light); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 2.857rem (40px); font-weight: 300 (light); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <h3 class="pt-4 display-h2">display-h2</h3>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 2.857rem (40px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 2.286rem (32px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 1.714rem (24px); font-weight: 400 (regular); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <h5 class="pt-4 display-h3">display-h3</h5>
      <div style="color:#888;"><strong>Desktop:</strong> font-size: 1.643rem (23px); font-weight: 700 (semi-bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Tablet:</strong> font-size: 1.5rem (21px); font-weight: 700 (semi-bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
      <div style="color:#888;"><strong>Mobile:</strong> font-size: 1.357rem (19px); font-weight: 700 (semi-bold); text-transform: uppercase; margin: 0; line-height: 1;</div>
    </VCard>
    <VCard class="elevation-2 pa-8">
      <h3 class="text-capitalize">Classes</h3>
      <p class="pt-4">Add the below classes to any property to override it's font size, weight, color, etc.</p>
      <v-divider class="my-4"></v-divider>
      <p class="font-weight-bold text-uppercase py-4">Colors:</p>
      <p class="white--text pa-2" style="background-color: #ccc; border-radius: 0 !important;">white--text</p>
      <p class="primary--text">primary--text</p>
      <p class="secondary--text">secondary--text</p>
      <v-divider class="my-4"></v-divider>
      <p class="font-weight-bold text-uppercase py-4">font weights:</p>
      <p class="font-weight-regular">font-weight-regular</p>
      <p class="font-weight-bold">font-weight-bold</p>
      <p class="font-weight-black">font-weight-black</p>
      <v-divider class="my-4"></v-divider>
      <p class="font-weight-bold text-uppercase py-4">font size:</p>
      <p class="font10">font10</p>
      <p class="font12">font12</p>
      <p class="font14">font14</p>
      <p class="font16">font16</p>
      <p class="font18">font18</p>
      <p class="font20">font20</p>
      <p class="font22">font22</p>
      <p class="font24">font24</p>
      <v-divider class="my-4"></v-divider>
      <p class="font-weight-bold text-uppercase py-4">text transform:</p>
      <p class="text-uppercase">text-uppercase</p>
      <p class="text-capitalize">text-capitalize</p>
    </VCard>
    <VCard class="pa-8 my-12 elevation-4">
      <SBtn v-bind="$props">{{ titleText }}</SBtn>
      <div class="pt-4" style="color:#888;">Dynamic Text for testing</div>
    </VCard> 
  </VContainer>
  `,
})