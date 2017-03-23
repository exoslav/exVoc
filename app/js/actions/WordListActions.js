import Dispatcher from '../dispatcher'

export function createTodo(data) {
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
