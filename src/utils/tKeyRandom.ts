import { useI18n } from 'vue-i18n'
import pl from '@/i18n/pl.json'

const getContentsOfKey = (keyPath: string[], translationsSet: any): string | string[] | null => {
  const currentKey = keyPath.shift() as string

  if (translationsSet[currentKey] === undefined) {
    return null
  } else {
    if (keyPath.length === 0 && (typeof translationsSet[currentKey] === 'string' || Array.isArray(translationsSet[currentKey]))) {
      return translationsSet[currentKey]
    } else {
      return getContentsOfKey(keyPath, translationsSet[currentKey])
    }
  }
}

let i18n: ReturnType<typeof useI18n> | null = null

function tKeyRandom(key: string): string {
  if (!i18n) {
    try {
      i18n = useI18n()
    } catch (e) {
      return key
    }
  }

  const locale: string = i18n.locale.value
  const translations = locale === 'pl' ? pl : null

  if (!translations) {
    return key
  }

  const keyPath = key.split('.')
  const contents = getContentsOfKey(keyPath, translations)


  if (typeof contents === 'string') {
    return contents
  }

  if (Array.isArray(contents) && contents.length > 0) {
    const randomIndex = Math.floor(Math.random() * contents.length)
    return `${key}[${randomIndex}]`
  }

  return key
}

export default tKeyRandom