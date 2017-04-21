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
  }

  handleLearned() {
    const item = {
      id: this.item.id,
      data: {
        learned: !this.item.learned
      }
    }

    this.props.itemHandle(item, 'vocabulary', 'changeItem')
    this.props.itemHandle(item, 'featured', 'changeItem')
  }

  removeItem() {
    const item = {
      id: this.item.id,
      data: {
        featured: !this.item.featured
      }
    }

    this.props.itemHandle(item, 'vocabulary', 'changeItem')
    this.props.itemHandle(item, 'featured', 'deleteItem')
  }

  render() {
    const item = this.item
    const erase = this.props.delete
    const { id, name, idiom, learned, featured, wordClass, description } = this.props.data

    item.id = id
    item.name = name
    item.idiom = idiom
    item.learned = learned
    item.featured = featured
    item.wordClass = wordClass
    item.description = description

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
              onClick={this.handleLearned.bind(this)}
              class={`fa fa-graduation-cap btn ${item.learned ? 'btn-success' : 'btn-danger'} btn-xs`}
              type="button"
              data-id={id}
            ></button>

            <button
              onClick={this.removeItem.bind(this)}
              class={`fa fa-star btn btn-primary btn-xs`}
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
