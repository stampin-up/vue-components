import minifyTheme from 'minify-css-string'
import './overrides.scss'

export const preset = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    }
  },
  icons: {
    iconfont: 'md'
  },
  rtl: false,
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme,
      variations: false,
      themeCache: undefined
    },
    themes: {
      light: {
        primary: '#333333', // all text
        secondary: '#E33C84',
        accent: '#82B1FF',
        error: '#ff0000',
        info: '#000000',
        success: '#62c2ba',
        warning: '#ffda00',
        header: '#00AB9E',
        iconDesktop: '#333333',
        greyedOut: '#888888', // greyed out text
        border: '#cccccc', // borders
        hover: '#888888', // hovers
        backgroundDiv: '#f8f8f8', // component background
        backgroundPage: '#e8e8e8' // page background
      }
    }
  }
}
