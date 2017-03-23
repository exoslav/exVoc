import Dispatcher from '../dispatcher'

export function addFeaturedItem(data) {
  Dispatcher.dispatch({
    actionType: 'ADD_FEATURED_ITEM',
    data
  })
}

export function deleteFeaturedItem(id, lang) {
  Dispatcher.dispatch({
    actionType: 'DELETE_FEATURED_ITEM',
    id,
    lang
  })
}
