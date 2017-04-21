import Dispatcher from '../dispatcher'

export function createItem(item, lang) {
  Dispatcher.dispatch({
    actionType: 'CREATE_ITEM_IN_WORDLIST',
    item,
    lang
  })
}

export function deleteItem(item, lang) {
  Dispatcher.dispatch({
    actionType: 'DELETE_ITEM_FROM_WORDLIST',
    item,
    lang
  })
}

export function changeItem(item, lang) {
  Dispatcher.dispatch({
    actionType: 'CHANGE_ITEM_IN_WORDLIST',
    item,
    lang
  })
}
