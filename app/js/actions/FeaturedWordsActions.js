import Dispatcher from '../dispatcher'

export function addItem(item, lang) {
  Dispatcher.dispatch({
    actionType: 'ADD_ITEM_TO_FEATURED',
    item,
    lang
  })
}

export function deleteItem(item, lang) {
  Dispatcher.dispatch({
    actionType: 'DELETE_ITEM_FROM_FEATURED',
    item,
    lang
  })
}


export function changeItem(item, lang) {
  Dispatcher.dispatch({
    actionType: 'CHANGE_ITEM_IN_FEATURED',
    item,
    lang
  })
}
