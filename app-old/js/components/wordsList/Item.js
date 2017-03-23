import React from 'react'

class WordsListItem extends React.Component {
  constructor(props) {
    super(props)

    const { id, name, content } = this.props.data

    this.id = id
    this.name = name
    this.content = content
  }

  render() {
    return(
      <div>
        <dt class="to-do-list-item">
          <strong>{this.name}</strong>
        </dt>
        <dd>
          <span>{this.content}</span>
          <button class="btn btn-info btn-xs" type="button" data-id={this.id}>+</button>
          <button class="btn btn-danger btn-xs" onClick={this.props.deleteItem} type="button" data-id={this.id}>X</button>
        </dd>
      </div>
    )
  }
}

export default WordsListItem
