import React from 'react'
import * as WordListActions from '../../actions/WordListActions'
import * as FeaturedWordsActions from '../../actions/FeaturedWordsActions'

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

  handleLearned() {
    const lang = this.lang
    const data = {
      id: this.item.id,
      learned: !this.item.learned
    }

    WordListActions.changeItem(data, lang)
    FeaturedWordsActions.changeItem(data, lang)
  }

  removeItem() {
    const lang = this.lang
    const data = {
      id: this.item.id,
      featured: !this.item.featured
    }

    WordListActions.changeItem(data, lang)
    FeaturedWordsActions.deleteItem(this.item.id, lang)
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
