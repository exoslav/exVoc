export let user = null
export let vocabularyLang = 'CZ'
export const setUser = name => user = name
export const setVocabularyLang = lang => {
  vocabularyLang = lang
  localStorage.setItem('activeLanguageItem', lang)
}
