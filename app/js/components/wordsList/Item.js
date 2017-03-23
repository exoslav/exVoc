import React from 'react'

class WordsListItem extends React.Component {
  render() {
    const layout = this.props.layout
    const { name, content, id, learned } = this.props.data
    const learnedClassName = learned ? 'bg-success' : 'bg-danger'
    return(
      <div class={`${layout}`}>
        <div class={`item ${learnedClassName}`}>
          <dt class="to-do-list-item">
            <strong>{name}</strong>
          </dt>
          <dd>
            <span>{content}</span>
            <button class="btn btn-danger btn-xs pull-right" onClick={this.props.deleteItem} type="button" data-id={id}>X</button>
            <button class="btn btn-warning btn-xs pull-right" type="button" data-id={id}>Add to featured</button>
          </dd>
        </div>
      </div>
    )
  }
}

export default WordsListItem
