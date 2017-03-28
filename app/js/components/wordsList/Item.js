import React from 'react'
import WordListStore from '../../stores/WordListStore'

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

  addFeatured(e) {
    const lang = this.lang
    const data = {
      id: this.item.id,
      featured: !this.item.featured
    }

    this.props.WordListActions.changeItem(data, lang)

    if(this.item.featured)
      this.props.FeaturedWordsActions.deleteItem(data.id, lang)
    else
      this.props.FeaturedWordsActions.addItem(this.item, lang)
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
              onClick={this.props.deleteItem}
              type="button"
              data-id={id}
            ></button>

            {
              // SWITCH LEARN STATE
            }
            <button
              class={`fa fa-graduation-cap btn ${this.item.learned ? 'btn-success' : 'btn-danger'} btn-xs pull-right`}
              type="button"
              data-id={id}
            ></button>

            {
              // ADD/REMOVE FROM FEATURED
            }
            <button
              class={`fa ${this.item.featured ? 'fa-star': 'fa-star-o'} btn btn-warning btn-xs pull-right`}
              onClick={this.addFeatured.bind(this)}
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
