/* eslint-disable */
// Adapted from: FROM : https://fernandobasso.github.io/javascript/unit-testing-vue-vuetify-with-jest-and-vue-test-utils.html
import util from 'util'
import Vue from 'vue'
import Vuetify from 'vuetify'
import chalk from 'chalk'

Vue.use(Vuetify)

// @ts-ignore
global.IntersectionObserver = class IntersectionObserver {
  observe () {
    return null
  }

  unobserve () {
    return null
  }
}

// @ts-ignore
const env = jasmine.getEnv()
const isSpy = (spy: any) => spy.calls && typeof spy.calls.count === 'function'

;['error', 'warn'].forEach((methodName) => {
  const unexpectedConsoleCallStacks: any = []
  const newMethod = function (format: any, ...args: any) {
    // Capture the call stack now so we can warn about it later.
    // The call stack has helpful information for the test author.
    // Don't throw yet though b'c it might be accidentally caught and suppressed.
    const stack: any = new Error().stack
    unexpectedConsoleCallStacks.push([
      stack.substr(stack.indexOf('\n') + 1),
      util.format(format, ...args)
    ])
  }

  // @ts-ignore
  console[methodName] = newMethod

  env.beforeEach(() => {
    unexpectedConsoleCallStacks.length = 0
  })

  env.afterEach(() => {
    // @ts-ignore
    if (console[methodName] !== newMethod && !isSpy(console[methodName])) {
      throw new Error(
        `Test did not tear down console.${methodName} mock properly.`
      )
    }

    if (unexpectedConsoleCallStacks.length > 0) {
      const messages = unexpectedConsoleCallStacks.map(
        ([stack, message] : [string, string]) =>
          `${chalk.red(message)}\n` +
            `${stack
              .split('\n')
              .map((line : string) => chalk.gray(line))
              .join('\n')}`
      )

      const message =
          `Expected test not to call ${chalk.bold(
            `console.${methodName}()`
          )}.\n\n` +
          'If the warning is expected, test for it explicitly by:\n' +
          `1. Using the ${chalk.bold('.toWarnDev()')} / ${chalk.bold(
            '.toLowPriorityWarnDev()'
          )} matchers, or...\n` +
          `2. Mock it out using ${chalk.bold(
            'spyOnDev'
          )}(console, '${methodName}') or ${chalk.bold(
            'spyOnProd'
          )}(console, '${methodName}'), and test that the warning occurs.`

      throw new Error(`${message}\n\n${messages.join('\n\n')}`)
    }
  })
})

process.on('unhandledRejection', (err) => {
  throw err
})

document.body.setAttribute('data-app', 'true')
Vue.config.productionTip = false
