import React from 'react'
import TodoStore from '../../stores/TodoStore'
import WordsListItem from './Item'
import * as TodoActions from '../../actions/TodoActions'

class TodoList extends React.Component {
  constructor() {
    super()

    this.state = {
      todos: TodoStore.getAll()
    }
  }

  componentWillMount() {
    TodoStore.on('change', () => {
      this.setState({
        todos: TodoStore.getAll()
      })
    })
  }

  createToDoItem() {
    let name = document.getElementById('create-to-do-item-name').value
    let content = document.getElementById('create-to-do-item-content').value

    TodoActions.createTodo({
      name,
      content
    })
  }

  deleteTodoItem(e) {
    const id = e.target.getAttribute('data-id')
    TodoActions.deleteTodoItem(id)
  }

  render() {
    const toDoList = this.state.todos.map((item) => <WordsListItem deleteItem={this.deleteTodoItem.bind(this)} key={item.id} data={item} />)

    return(
      <div class="col-sm-6">
        <dl class="dl-horizontal">
          {toDoList}
        </dl>
      </div>
    )
  }
}

export default TodoList
