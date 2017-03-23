import React from 'react'

class Item extends React.Component {
  render() {
    const erase = this.props.delete
    const { name, content, id, learned } = this.props.data

    return(
      <div class="item col-sm-3">
        <dt class="to-do-list-item">
          <strong class="item-header">
            <span class="item-name">{name}</span>
            <span title={`${learned ? 'Learned already!' : 'Not learned yet!'}`} class={`item-learned ${learned ? 'learned' : 'not-learned'}`}>&nbsp;</span>
          </strong>
        </dt>
        <dd>
          <span>{content}</span>
          <div>
            <button class="btn btn-success btn-xs" type="button" data-id={id}>learned</button>
            <button class="btn btn-warning btn-xs" type="button" data-id={id}>Add to vocabulary</button>
            <button onClick={erase} class="btn btn-danger btn-xs" type="button" data-id={id}>X</button>
          </div>
        </dd>
      </div>
    )
  }
}

export default Item
