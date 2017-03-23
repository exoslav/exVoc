import React from 'react'

class NewWordForm extends React.Component {
  render() {
    return(
      <form class="form clearfix">
        <div class="form-group">
          <label for="create-to-do-item-name">Název slovíčka</label>
          <input id="create-to-do-item-name" class="form-control" />
        </div>

        <div class="form-group">
          <label for="create-to-do-item-content">Popis slovíčka</label>
          <input id="create-to-do-item-content" class="form-control" />
        </div>

        <button
          class="btn btn-primary pull-right"
          onClick={this.createToDoItem.bind(this)} type="button">
          Create todo item
        </button>
      </form>
    )
  }
}

export default NewWordForm
