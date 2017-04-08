import Dispatcher from '../dispatcher'

export function createItem(data, lang, isFeatured) {
  Dispatcher.dispatch({
    actionType: 'CREATE_WORDLIST_ITEM',
    data,
    lang,
    isFeatured
  })
}

export function deleteItem(id, lang) {
  Dispatcher.dispatch({
    actionType: 'DELETE_WORDLIST_ITEM',
    id,
    lang
  })
}

export function changeItem(data, lang) {
  Dispatcher.dispatch({
    actionType: 'CHANGE_WORDLIST_ITEM',
    data,
    lang
  })
}
