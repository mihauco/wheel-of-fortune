import { createI18n } from 'vue-i18n'
import pl from './pl.json'

const i18n = createI18n({
  legacy: false,
  locale: 'pl',
  messages: {
    pl
  }
})

export default i18n