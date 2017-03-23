import Dispatcher from '../dispatcher'

export function createTodo(data) {
  Dispatcher.dispatch({
    actionType: 'CREATE_TODO_ITEM',
    data
  })
}

export function deleteTodoItem(id) {
  Dispatcher.dispatch({
    actionType: 'DELETE_TODO_ITEM',
    id
  })
}
