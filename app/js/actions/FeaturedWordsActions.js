import Dispatcher from '../dispatcher'

export function addItem(data, lang) {
  Dispatcher.dispatch({
    actionType: 'ADD_FEATURED_ITEM',
    data,
    lang
  })
}

export function deleteItem(id, lang) {
  Dispatcher.dispatch({
    actionType: 'DELETE_FEATURED_ITEM',
    id,
    lang
  })
}
