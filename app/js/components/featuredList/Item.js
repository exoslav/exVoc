import React from 'react'

class Item extends React.Component {
  constructor() {
    super()

    this.item = {
      id: null,
      name: null,
      idiom: null,
      learned: null,
      featured: null,
      wordClass: null,
      description: null
    }

    this.lang = null
  }

  render() {
    const item = this.item
    const lang = this.props.lang
    const erase = this.props.delete
    const { id, name, idiom, learned, featured, wordClass, description } = this.props.data

    item.id = id
    item.name = name
    item.idiom = idiom
    item.learned = learned
    item.featured = featured
    item.wordClass = wordClass
    item.description = description

    this.lang = lang

    return(
      <div class="item col-sm-3">
        <dt class="to-do-list-item">
          <strong class="item-header">
            <span class="item-name">{name}</span>
            <span
              title={`${learned ? 'Learned already!' : 'Not learned yet!'}`}
              class={`item-learned ${learned ? 'learned' : 'not-learned'}`}
            >&nbsp;</span>
          </strong>
        </dt>
        <dd>
          <span>{description}</span>
          <div>
            <button
              class={`fa fa-star btn btn-warning btn-xs`}
              type="button"
              data-id={id}
            ></button>
            {/* <button class="btn btn-warning btn-xs" type="button" data-id={id}>Add to vocabulary</button> */}
            <button
              onClick={erase}
              class="fa fa-close btn btn-danger btn-xs"
              type="button"
              data-id={id}
            ></button>
          </div>
        </dd>
      </div>
    )
  }
}

export default Item
