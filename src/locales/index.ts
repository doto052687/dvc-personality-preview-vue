import { createI18n } from 'vue-i18n'
import en_US from './en-US/index'
import zh_TW from './zh-TW/index'
import ko_KR from './ko-KR/index'
import _ from 'lodash'

const message = {
  'zh-TW': { ...zh_TW },
  'en-US': { ...en_US },
  'ko-KR': { ...ko_KR },
}

const langs = ['en-US', 'zh-TW', 'ko-KR']

function getLang(): string {
  const localLang = navigator.language
  const storageLang = localStorage.getItem('locale')?.toString()
  if (_.includes(langs, localLang)) {
    return localLang
  }
  if (_.includes(langs, storageLang) && storageLang !== undefined) {
    return storageLang
  }
  return 'en-US'
}

const i18n = createI18n({
  legacy: false,
  locale: getLang(), //當地語系
  allowComposition: true,
  fallbackLocale: 'en-US', //若當地語系查無則查英文
  globalInjection: true, //全域註冊$t方法
  messages: message,
})

export default i18n
