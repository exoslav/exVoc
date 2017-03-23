import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'

class Store extends EventEmitter {
  constructor() {
    super()

    this.todos = [
      {
        id: 6541864,
        name: 'Sportovat',
        content: 'Hrat fotbal a plavat',
        wordType: 1
      },
      {
        id: 45684655,
        name: 'Nakoupit',
        content: 'Jidlo a veci do prace a skoly',
        wordType: 2
      }
    ]
  }

  createToDoItem(data) {
    const { name, content } = data

    this.todos.push({
      id: Date.now(),
      name,
      content
    })

    this.emit('change')
  }

  deleteToDoItem(id) {
    const todoList = this.todos
    for (let i = 0; i < todoList.length; i++) {
      if(todoList[i].id === parseInt(id))
        todoList.splice(i, 1)
    }

    this.emit('change')
  }

  getAll() {
    return this.todos
  }

  handleActions(action) {
    switch (action.actionType) {
      case 'CREATE_TODO_ITEM':
        this.createToDoItem(action.data)
        break;
      case 'DELETE_TODO_ITEM':
        this.deleteToDoItem(action.id)
        break;
      default:
    }
  }
}

const TodoStore = new Store

Dispatcher.register(TodoStore.handleActions.bind(TodoStore))

export default TodoStore
