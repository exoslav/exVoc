import React from 'react'

class Item extends React.Component {
  render() {
    const erase = this.props.delete
    const { name, description, id, learned } = this.props.data

    const learnState = {
      bg: learned ? 'btn-success' : 'btn-danger',
      className: learned ? 'learned' : 'not-learned',
      title: learned ? 'Learned already!' : 'Not learned yet!'
    }

    return(
      <div class="item col-sm-3">
        <dt class="to-do-list-item">
          <strong class="item-header">
            <span class="item-name">{name}</span>
            <span title={`${learnState.title}`} class={`item-learned ${learnState.className}`}>&nbsp;</span>
          </strong>
        </dt>
        <dd>
          <span>{description}</span>
          <div>
            <button class={`btn ${learnState.bg} btn-xs`} type="button" data-id={id}>learned</button>
            {/* <button class="btn btn-warning btn-xs" type="button" data-id={id}>Add to vocabulary</button> */}
            <button onClick={erase} class="btn btn-danger btn-xs" type="button" data-id={id}>X</button>
          </div>
        </dd>
      </div>
    )
  }
}

export default Item
