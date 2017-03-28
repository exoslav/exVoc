import React from 'react'
import * as WordListActions from '../../actions/WordListActions'
import * as FeaturedWordsActions from '../../actions/FeaturedWordsActions'

class WordsListItem extends React.Component {
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

  handleFeatured() {
    const lang = this.lang
    const data = {
      id: this.item.id,
      featured: !this.item.featured
    }

    WordListActions.changeItem(data, lang)

    if(this.item.featured)
      FeaturedWordsActions.deleteItem(data.id, lang)
    else
      FeaturedWordsActions.addItem(this.item, lang)
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

  deleteItem() {
    WordListActions.deleteItem(this.item.id, this.lang)
    FeaturedWordsActions.deleteItem(this.item.id, this.lang)
  }

  render() {
    const item = this.item
    const lang = this.props.lang
    const layout = this.props.layout
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
      <div class={`${layout}`}>
        <div class={`item ${learned ? 'bg-success' : 'bg-danger'}`}>
          <dt class="wordlist-item">
            <strong class="name">{name}</strong>
          </dt>
          <dd>
            <span class="description">{description}</span>

            {
              // DELETE ITEM
            }
            <button
              class="fa fa-trash-o btn btn-danger btn-xs pull-right"
              onClick={this.deleteItem.bind(this)}
              type="button"
              data-id={id}
            ></button>

            {
              // ADD/REMOVE FROM FEATURED
            }
            <button
              class={`fa ${this.item.featured ? 'fa-star': 'fa-star-o'} btn btn-primary btn-xs pull-right`}
              onClick={this.handleFeatured.bind(this)}
              type="button"
              data-id={id}
            ></button>

            {
              // SWITCH LEARN STATE
            }
            <button
              class={`fa fa-graduation-cap btn ${this.item.learned ? 'btn-success' : 'btn-danger'} btn-xs pull-right`}
              onClick={this.handleLearned.bind(this)}
              type="button"
              data-id={id}
            ></button>
          </dd>
        </div>
      </div>
    )
  }
}

export default WordsListItem
