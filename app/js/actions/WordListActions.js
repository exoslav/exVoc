import Dispatcher from '../dispatcher'

export function createItem(data) {
  console.log(data)
  Dispatcher.dispatch({
    actionType: 'CREATE_WORDLIST_ITEM',
    data
  })
}

export function deleteWordListItem(id, lang) {
  Dispatcher.dispatch({
    actionType: 'DELETE_WORDLIST_ITEM',
    id,
    lang
  })
}
