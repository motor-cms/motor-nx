// @ts-nocheck
import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages: LocaleMessages<VueMessageType> = {}
  locales.keys().forEach((key) => {
    let variables = {}

    // Recursively go through the languages folder and read all json files in the directories and build the messages object
    // This allows us to split the language variables in separate files
    key.split('/').reduce(function (r, e) {
      // If we find a json file in the path, read the variables from it and assign it to the object
      variables = e.search(/\.json/i) > 0 ? locales(key).default : {}
      // Strip the .json file ending from the path fragment
      e = e.replace('.json', '')
      if (e !== '.') {
        return r[e] || (r[e] = variables)
      }
      return r
    }, messages)
  })
  return messages
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
})
